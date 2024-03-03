import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { PendingStudent, Score, Student, Teacher, Test } from "../db";
import {
  ScoreType,
  StudentType,
  SubjectScoreType,
  TeacherType,
  TestType,
} from "../types";

// Todo all mongo logic here
// Todo restrict creating duplicate users
export const studentRegister = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      username,
      password,
      academicYear,
      stream,
      pursuingYear,
    } = req.body;

    if (
      !name ||
      !email ||
      !username ||
      !password ||
      !academicYear ||
      !stream ||
      !pursuingYear
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all the details" });
    }

    let student = await Student.findOne({ email });

    if (student) {
      return res.status(400).json({
        message: "Student already exists with this email",
      });
    }

    student = await Student.findOne({ username });

    if (student) {
      return res.status(400).json({
        message: "Username already taken",
      });
    }

    let pendingStudent = await PendingStudent.findOne({ username, email });

    if (pendingStudent) {
      return res.status(400).json({
        message: "Request already exists",
      });
    }

    pendingStudent = await PendingStudent.create({
      username,
      name,
      email,
      password,
      academicYear,
      stream,
      pursuingYear,
    });

    res.status(200).json({
      message: "Request sent successfully. Wait until it gets approved!",
    });
  } catch (e) {
    // ! Remove 'e' which might potentially show authorised details
    console.error("Error creating student:", e);
    res.status(500);
  }
};

export const studentLogin = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ message: "Please provide username, email and password" });
    }

    const student: StudentType | null = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.username !== username) {
      return res.status(411).json({ message: "Incorrect username" });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(411).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    res.status(200).json({
      student,
      message: "Student logged in successfully",
      token,
    });
  } catch (e) {
    // ! Remove 'e' which might potentially show authorised details
    console.error("Error logging student:", e);
    res.status(500);
  }
};

export const getMyTests = async (req: Request, res: Response) => {
  // passing username from auth middleware
  const { username } = res.locals;

  const student: StudentType | null = await Student.findOne({ username });

  const submissions = student?.submissions;

  res.status(200).json({
    submissions,
  });
};

export const getTestById = async (req: Request, res: Response) => {
  const { testId } = req.params;
  const { username } = res.locals;

  if (!testId) {
    return res.status(400).json({
      message: "Please provide test id",
    });
  }

  let test: TestType | null = await Test.findOne({ _id: testId });

  if (!test) {
    return res.status(404).json({
      message: "Test not found",
    });
  }

  const student: StudentType | null = await Student.findOne({ username });

  const isRepeat = test?.submissions?.find(
    (submission) => String(student?._id) == String(submission?.submittedBy)
  );

  const sortedSubmissions = test.submissions.sort(
    (x, y) => y.obtainedMarks - x.obtainedMarks
  );

  const currentDateTime = new Date();
  const options = {
    timeZone: "Asia/Kolkata",
    hour12: false,
  };
  const indianTime = currentDateTime.toLocaleString("en-US", options);
  const formattedDate = new Date(indianTime).toISOString().split("T")[0];

  if (
    isRepeat &&
    test?.startDate === formattedDate &&
    indianTime.slice(11, 16) <= test?.endTime
  ) {
    return res.status(400).json({
      message: "Response already submitted",
    });
  }

  const teacher: TeacherType | null = await Teacher.findOne({
    _id: test.createdBy,
  });

  if (!teacher) {
    return res.status(500).json({
      message: "Failed to find some test data",
    });
  }

  res.status(200).json({
    message: "Done Successfully",
    test,
    creator: teacher.username,
    sortedSubmissions,
  });
};

export const testSubmission = async (req: Request, res: Response) => {
  const { testId } = req.params;
  const { submittedAnswersIndex } = req.body; // from frontend
  let marksObtained = 0;
  const { username } = res.locals;

  if (!testId) {
    return res.status(400).json({
      message: "Please provide test id",
    });
  }

  if (!submittedAnswersIndex) {
    return res.status(400).json({
      message: "Please provide test response",
    });
  }

  let student: StudentType | null = await Student.findOne({ username });

  const test: TestType | null = await Test.findOne({ _id: testId });

  const marksPerQuestion = test?.totalMarks / test?.questions?.length;

  test?.questions?.map((question, i) => {
    if (question?.answerIndex === submittedAnswersIndex[i]) {
      marksObtained += marksPerQuestion;
    }
  });

  const formattedTime = new Date().toTimeString();
  test?.submissions?.push({
    submittedBy: student?._id,
    name: student?.name,
    obtainedMarks: marksObtained,
    submittedAt: formattedTime.slice(0, 8),
  });

  await test?.save();

  student = await Student.findOneAndUpdate(
    { username },
    {
      $push: {
        submissions: {
          test: test._id,
          subject: test.subject,
          submittedAnswersIndex: submittedAnswersIndex,
          marksObtained: marksObtained,
          submittedAt: new Date(Date.now()),
        },
      },
    },
    { new: true }
  );

  if (!student) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }

  if (Array.isArray(student.subjectScore)) {
    // const allSubjectScores: SubjectScoreType[];

    const subjectIndex: number = student.subjectScore.findIndex(
      (x: SubjectScoreType) => x.subject === test.subject
    );

    if (subjectIndex === -1) {
      student.subjectScore.push({
        subject: test.subject,
        score: marksObtained,
      });
    } else {
      student.subjectScore[subjectIndex].score += marksObtained;
    }

    await student.save();
  } else {
    console.error("student.subjectScore is not an array");
  }

  // Todo resove score data
  const score = await Score.findOneAndUpdate(
    { candidate: student._id },
    {
      $inc: {
        score: marksObtained,
      },
      submissions: student?.submissions?.length,
    },
    { new: true }
  );

  res.json({
    message: "Test submitted successfully",
    test,
    student,
    score,
  });
};

export const bookMarkTest = async (req: Request, res: Response) => {
  const { testId } = req.body;
  const { username } = res.locals;

  const student: StudentType | null = await Student.findOneAndUpdate({
    username: username,
  });

  if (!student) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }

  let indexOfTest = student.bookmark.indexOf(testId);
  if (indexOfTest == -1) {
    student.bookmark.push(testId);
  } else {
    student.bookmark.splice(indexOfTest, 1);
  }

  await student.save();

  if (indexOfTest == -1)
    return res.status(200).json({
      message: "Test Bookmark Succesfully",
    });

  res.status(200).json({
    message: "Test remove from Bookmark Succesfully",
  });
};

export const getAllBookMarkTest = async (req: Request, res: Response) => {
  const { username } = res.locals;
  try {
    const student = await Student.findOne({
      username: username,
    });

    const allBookmarkedTests = await Test.find({
      _id: { $in: student.bookmark },
    });

    res.status(200).json({
      allBookmarkedTests,
    });
  } catch (error) {
    res.status(500).json({
      messsage: "Some error occured",
    });
    console.log(error, "Error in GetAllBookMarkedTest");
  }
};

export const updateStudentProfile = async (req: Request, res: Response) => {
  let { username } = res.locals;
  const {
    name,
    usernameNew,
    password,
    email,
    githubUrl,
    linkdinUrl,
    twitterUrl,
  } = req.body;
  try {
    const student: StudentType | null = await Student.findOne({
      username: username,
    });

    if (!student) {
      return res.status(200).json({
        message: "Student Not Found",
      });
    }

    // changing password if it is provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      student.password = hashedPassword;
    }

    student.name = name || student.name;
    student.username = usernameNew || student.username;
    student.email = email || student.email;
    student.githubUrl = githubUrl || student.githubUrl;
    student.linkedinUrl = linkdinUrl || student.linkedinUrl;
    student.twitterUrl = twitterUrl || student.twitterUrl;

    await student.save();

    res.status(200).json({
      message: "Student Profile Updated",
      user: student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some Error occured!",
    });
    console.log("Error in Update Student ", error);
  }
};

export const updateSeenStudent = async (req: Request, res: Response) => {
  const { username } = res.locals;
  try {
    await Student.updateOne(
      {
        username,
      },
      {
        $set: { "announcements.$[].seen": true },
      }
    );
    res.status(200).json({
      message: "All Seen Successfully",
    });
  } catch (error) {
    console.log(error, "Error in student updateSeen route");
  }
};

export const allStudents = async (req: Request, res: Response) => {
  const { username } = res.locals;

  const student: StudentType | null = await Student.findOne({ username });

  const allStudents: StudentType[] | null = await Student.find({
    stream: student.stream,
    pursuingYear: student.pursuingYear,
  });

  if (!allStudents) {
    return res.status(500).json({
      message: "Failed to get all students",
    });
  }

  res.status(200).json({ message: "Done Successfully", allStudents });
};

export const allTeachers = async (req: Request, res: Response) => {
  const { username } = res.locals;

  const student: StudentType | null = await Student.findOne({ username });

  const allTeachers: TeacherType[] | null = await Teacher.find({
    stream: student.stream,
  });

  if (!allTeachers) {
    return res.status(500).json({
      message: "Failed to get all teachers",
    });
  }

  res.status(200).json({ message: "Done Successfully", allTeachers });
};

export const serachStudent = async (req: Request, res: Response) => {
  const { username } = req.params;
  const currentStudentUsername = res.locals.username;

  if (!username) {
    return res.status(400).json({
      message: "Please provide student name",
    });
  }

  const currentStudent: StudentType | null = await Student.findOne({
    username: currentStudentUsername,
  });

  const resStudent = await Student.findOne({
    username,
    stream: currentStudent.stream,
    pursuingYear: currentStudent.pursuingYear,
  });

  if (!resStudent) {
    return res.status(404).json({
      message: "Student not found in the database",
    });
  }

  res.status(200).json({
    resStudent,
  });
};

export const serachTeacher = async (req: Request, res: Response) => {
  const { username } = req.params;
  const currentStudentUsername = res.locals.username;

  if (!username) {
    return res.status(400).json({
      message: "Please provide student name",
    });
  }

  const currentStudent: StudentType | null = await Student.findOne({
    username: currentStudentUsername,
  });

  const teacher: TeacherType | null = await Teacher.findOne({
    username,
    stream: currentStudent.stream,
  });

  if (!teacher) {
    return res.status(404).json({
      message: "Teacher not found in the database",
    });
  }

  res.status(200).json({
    teacher,
  });
};

export const getScoreBoard = async (req: Request, res: Response) => {
  const { username } = res.locals;

  const student: StudentType | null = await Student.findOne({ username });

  // Todo check null points
  const scoreBoard: ScoreType[] | null = await Score.find({
    stream: student.stream,
    pursuingYear: student.pursuingYear,
  }).sort({
    score: -1,
  });

  if (!scoreBoard) {
    return res.status(500).json({
      message: "Opps! can't load leaderboard",
    });
  }

  res.status(200).json({
    message: "Done Successfully",
    scoreBoard,
  });
};

export const getSubjectFilteredScoreBoard = async (
  req: Request,
  res: Response
) => {
  const { subject } = req.params;
  const { username } = res.locals;

  if (!subject) {
    return res.status(400).json({
      message: "Please provide subject name",
    });
  }

  const student: StudentType | null = await Student.findOne({ username });

  const students: StudentType[] | null = await Student.find({
    "subjectScore.subject": subject,
    stream: student.stream,
    pursuingYear: student.pursuingYear,
  });

  if (!students) {
    return res.status(500).json({
      message: "Failed to retrieve students",
    });
  }

  // Todo remaining with testing
  const sortedStudents = students.sort((x, y) => {
    const xSubjectScore = x.subjectScore.find((z) => z.subject === subject);
    const ySubjectScore = y.subjectScore.find((z) => z.subject === subject);

    if (xSubjectScore && ySubjectScore) {
      return ySubjectScore.score - xSubjectScore.score;
    } else {
      return 0;
    }
  });

  const formattedRes = sortedStudents.map((student) => {
    const requiredSubject: SubjectScoreType = student?.subjectScore?.find(
      (x) => x?.subject === subject
    );

    const filteredSubmission = student.submissions.filter((submission) => {
      return submission.subject === subject;
    });

    return {
      name: student?.name,
      username: student?.username,
      submissions: filteredSubmission?.length,
      score: requiredSubject?.score,
    };
  });

  res.status(200).json({
    message: "Done Successfully",
    formattedRes,
  });
};

export const getSubjectFilteredTests = async (req: Request, res: Response) => {
  const { subject } = req.params;
  const { username } = res.locals;

  if (!subject) {
    return res.status(400).json({
      message: "Please provide subject name",
    });
  }

  const student: StudentType | null = await Student.findOne({ username });

  // replacing any special characters in the 'subject'
  const escapedSubject = subject.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const tests: TestType[] | null = await Test.find({
    subject: { $regex: new RegExp(escapedSubject, "i") },
    stream: student.stream,
    forYear: student.pursuingYear,
  });

  if (!tests) {
    return res.status(500).json({
      message: "Failed to retrieve tests",
    });
  }

  res.status(200).json({
    message: "Done Successfully",
    tests,
  });
};

export const getUpComingTests = async (req: Request, res: Response) => {
  const { username } = res.locals;

  const student: StudentType | null = await Student.findOne({ username });

  const currentDateTime = new Date();
  const options = { timeZone: "Asia/Kolkata", hour12: false };
  const indianTime = currentDateTime.toLocaleString("en-US", options);

  const upcoming = await Test.find({
    $and: [
      { stream: student.stream, forYear: student.pursuingYear },
      {
        $or: [
          {
            startDate: {
              $gt: currentDateTime.toISOString().slice(0, 10),
            },
          },
          {
            startDate: currentDateTime.toISOString().slice(0, 10),
            time: { $gt: indianTime.slice(10, 15) },
          },
        ],
      },
    ],
  });

  res.status(200).json({
    message: "Done Successfully",
    upcoming,
  });
};

export const getClosedTests = async (req: Request, res: Response) => {
  const { username } = res.locals;

  const student: StudentType | null = await Student.findOne({ username });

  const currentDateTime = new Date();
  const options = { timeZone: "Asia/Kolkata", hour12: false };
  const indianTime = currentDateTime.toLocaleString("en-US", options);

  const closed = await Test.find({
    $and: [
      { stream: student.stream, forYear: student.pursuingYear },
      {
        $or: [
          {
            startDate: {
              $lt: currentDateTime.toISOString().slice(0, 10),
            },
          },
          {
            startDate: currentDateTime.toISOString().slice(0, 10),
            endTime: { $lt: indianTime.slice(10, 15) },
          },
        ],
      },
    ],
  });

  res.status(200).json({
    message: "Done Successfully",
    closed,
  });
};

export const getLiveTests = async (req: Request, res: Response) => {
  const { username } = res.locals;

  const student: StudentType | null = await Student.findOne({ username });

  const currentDateTime = new Date();
  const options = { timeZone: "Asia/Kolkata", hour12: false };
  const indianTime = currentDateTime.toLocaleString("en-US", options);

  const live = await Test.find({
    $and: [
      { stream: student.stream, forYear: student.pursuingYear },
      { startDate: currentDateTime.toISOString().slice(0, 10) },
      { time: { $lte: indianTime.slice(10, 15) } },
      { endTime: { $gte: indianTime.slice(10, 15) } },
    ],
  });

  res.status(200).json({
    message: "Successfully Fetched the live test",
    live,
  });
};

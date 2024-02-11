import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Score, Student, Test } from "../db";
import { StudentType, TestType } from "../types";

interface SubjectScoreType {
  subject: string;
  score: number;
}

// Todo all mongo logic here
// Todo restrict creating duplicate users
export const studentRegister = async (req: Request, res: Response) => {
  try {
    const { name, email, username, password } = req.body;
    if (!name || !email || !username || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, username, and password" });
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

    const hashedPassword = await bcrypt.hash(password, 10);

    student = await Student.create({
      username,
      name,
      email,
      password: hashedPassword,
      submissions: [],
    });
    if (!student) {
      return res.status(500).json({ message: "Failed to create student" });
    }

    await Score.create({ candidate: student._id });

    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    res.status(200).json({
      message: "Student created successfully",
      student,
      token,
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

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res
        .status(411)
        .json({ message: "Incorrect username or password" });
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

export const testSubmission = async (req: Request, res: Response) => {
  const { testId } = req.params;
  const { submittedAnswersIndex, marksObtained } = req.body; // from frontend
  const { username } = res.locals;

  if (!testId) {
    return res.status(400).json({
      message: "Please provide test id",
    });
  }

  let student: StudentType | null = await Student.findOne({ username });

  const test: TestType | null = await Test.findOneAndUpdate(
    { _id: testId },
    {
      $push: {
        submissions: {
          submittedBy: student._id,
          obtainedMarks: marksObtained,
        },
      },
    },
    {
      new: true,
    }
  );

  student = await Student.findOneAndUpdate(
    { username },
    {
      $push: {
        submissions: {
          test: test._id,
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

  const student = await Student.findOneAndUpdate({
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
  // const { username } = res.locals;
  let username = "abhay_19";
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

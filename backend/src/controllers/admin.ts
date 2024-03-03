import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Admin, Announcment, Student, Teacher } from "../db/index";
import { AdminType } from "../types";

// Todo all mongo logic here
export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, username, and password" });
    }

    const admin: AdminType | null = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch: boolean = await bcrypt.compare(password, admin.password);
    // const isMatch: boolean = password == admin.password;

    if (!isMatch) {
      return res.status(411).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    res.status(200).json({
      message: "Admin logged in successfully",
      admin,
      token,
    });
  } catch (e) {
    // ! Remove 'e' which might potentially show authorised details
    console.error("Error logging admin:", e);
    res.status(500);
  }
};

export const createTeacher = async (req: Request, res: Response) => {
  try {
    const { name, email, username, password, stream } = req.body;
    if (!name || !email || !username || !password || !stream) {
      return res.status(400).json({
        message: "Please provide name, username, password and stream",
      });
    }

    let teacher = await Teacher.findOne({ email });

    if (teacher) {
      return res.status(400).json({
        message: "Teacher already exists with this email",
      });
    }

    teacher = await Teacher.findOne({ username });

    if (teacher) {
      return res.status(400).json({
        message: "Username already taken",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    teacher = await Teacher.create({
      username,
      name,
      email,
      password: hashedPassword,
      stream,
      createdTests: [],
    });

    if (!teacher) {
      return res.status(500).json({ message: "Failed to create teacher" });
    }

    res.status(200).json({
      message: "Teacher created successfully",
      teacher,
    });
  } catch (e) {
    // ! Remove 'e' which might potentially show authorised details
    console.error("Error creating teacher:", e);
    res.status(500);
  }
};

export const removeTeacher = async (req: Request, res: Response) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({
      message: "Please provide username",
    });
  }

  const teacher = await Teacher.findOneAndDelete({ username });

  if (!teacher) {
    return res.status(404).json({
      message: "Teacher not found in the database",
    });
  }

  res.status(200).json({
    message: "Teacher deleted successfully",
    teacher,
  });
};

export const removeStudent = async (req: Request, res: Response) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({
      message: "Please provide username",
    });
  }

  const student = await Student.findOneAndDelete({ username });

  if (!student) {
    return res.status(404).json({
      message: "Student not found in the database",
    });
  }

  res.status(200).json({
    message: "Student deleted successfully",
    student,
  });
};

export const createAdmin = async (req: Request, res: Response) => {
  const { name, username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    username,
    name,
    email,
    password: hashedPassword,
    announcements: [],
  });

  res.status(200).json({
    message: "Admin created",
    admin,
  });
};

export const updateSeenAdmin = async (req: Request, res: Response) => {
  const { username } = res.locals;
  try {
    await Admin.updateOne(
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

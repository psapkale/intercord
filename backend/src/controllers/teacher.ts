import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Teacher } from "../db";

interface TeacherType extends Document {
  username: string;
  name: string;
  email: string;
  password: string;
  createdTests: [];
}

// Todo all mongo logic here
export const teacherLogin = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, username, and password" });
    }

    const teacher: TeacherType | null = await Teacher.findOne({ email });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);

    if (!isMatch) {
      return res
        .status(411)
        .json({ message: "Incorrect username or password" });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    res.status(200).json({
      message: "Teacher logged in successfully",
      token,
    });
  } catch (e) {
    // ! Remove 'e' which might potentially show authorised details
    console.error("Error logging teacher:", e);
    res.status(500);
  }
};

export const createTest = async (req: Request, res: Response) => {
   try {
      const { subject, description, totalQuestions, totalMarks, questions } =
         req.body;

      const teacherId = (req as CustomRequest).teacherId;

      const payload = {
         subject,
         description,
         totalQuestions,
         totalMarks,
         questions,
         createdBy: teacherId,
         submissions: [],
      };

      const test = await Test.create(payload);

      if (!test) {
         return res.status(500).json({ message: 'Failed to create test' });
      }

      await Teacher.findOneAndUpdate(
         { _id: teacherId },
         {
            $push: { createdTests: test._id },
         },
         { new: true }
      );

      res.status(200).json({
         message: 'Test created successfully',
         test,
      });
   } catch (e) {
      // ! Remove 'e' which might potentially show authorised details
      console.error('Error logging teacher:', e);
      res.status(500);
   }
};

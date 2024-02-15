import express, { Request, Response } from "express";
import { router } from "./routes";
import { router as adminRouter } from "./routes/admin";
import { router as teacherRouter } from "./routes/teacher";
import { router as studentRouter } from "./routes/student";
import cors from "cors";
import dotenv from "dotenv";
import { server, app } from "./socket/socket";

const port = 3000;

// Defined routes
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/api/admin", adminRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/student", studentRouter);

// common routes
app.use("/api", router);

// Start the server
server.listen(port, () => {
  console.log(`Server listening on port: ${3000}`);
});

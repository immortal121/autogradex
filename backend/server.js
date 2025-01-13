import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import userRouter from "./routes/users.js";
// import evaluateRouter from "./routes/evaluate.js";
// import adminRouter from "./routes/admin.js";
import pdfImgRouter from "./routes/pdfimg.js";
import NewAdminRouter from "./routes/aadmin.js";
import classRouter from './routes/class.js';
import studentRouter from './routes/student.js';
import teacherRouter from './routes/teacher.js';
import assignmentRouter from "./routes/assigment.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use("/users", userRouter);
// app.use("/evaluate", evaluateRouter);
// app.use("/admin", adminRouter);

app.use("/assignment", assignmentRouter);
app.use("/teacher", teacherRouter);

app.use("/student", studentRouter);
app.use("/class", classRouter);
app.use("/aadmin", NewAdminRouter);
app.use("/pdfimg", pdfImgRouter);

app.get("/", (req, res) => {
    res.send("EvaluateAI API");
});

async function connectDB() {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");
}

connectDB();

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});
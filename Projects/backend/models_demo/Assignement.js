import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  dueDate: { type: Date, required: true },
  totalMarks: { type: Number, required: true },
  questionStructure: { type: mongoose.Schema.Types.Mixed }, // Allow flexible question structure
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
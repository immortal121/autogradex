import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  questionPaper: { type: String }, 
  totalMarks: { type: Number, required: true },
  structure: { type: String }, 
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
});

export default mongoose.model('Assignment', assignmentSchema);
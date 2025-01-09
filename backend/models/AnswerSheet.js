import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const answerSheetSchema = new Schema({
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  scoredMarks: { type: Number },
  comments: { type: String },
});

export default mongoose.model('AnswerSheet', answerSheetSchema);
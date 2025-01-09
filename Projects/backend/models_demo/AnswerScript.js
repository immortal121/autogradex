import mongoose from "mongoose";

const answerScriptSchema = new mongoose.Schema({
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    submittedAt: { type: Date, default: Date.now },
    scriptFile: { type: String, required: true },
    marksObtained: Number,
    evaluationStatus: { type: String, enum: ['Pending', 'Evaluated', 'Graded'] },
    evaluatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const AnswerScripts = mongoose.model('AnswerScript', answerScriptSchema);


export default AnswerScripts;

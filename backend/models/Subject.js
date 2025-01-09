import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },  
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }, 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
});

export default mongoose.model('Subject', subjectSchema);
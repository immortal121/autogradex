import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true } 
});

export default mongoose.model('Class', classSchema);
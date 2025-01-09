import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }, // Reference to Organization model
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to Admin model
});

export default mongoose.model('Section', sectionSchema);
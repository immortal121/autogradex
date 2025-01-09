import mongoose from "mongoose";
import { defaultMaxListeners } from "nodemailer/lib/xoauth2";

const classSchema = new mongoose.Schema({
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  className: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Class = mongoose.model('Class', classSchema);
export default Class;
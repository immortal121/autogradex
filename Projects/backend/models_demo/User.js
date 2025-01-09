import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Teacher', 'Student'], required: true }, // 0 student, 1 teacher, 2 admn ,3 super admin
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User= mongoose.model('User', userSchema);

export default User;
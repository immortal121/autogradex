import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },

  // For Students
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' }, 
  section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' }, 

  // For Teachers
  teaching: [{ 
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }
  }],

  role: { 
    type: Number, 
    enum: [0,1,2,3], // 0 super admin, 1 admin , 2 teacher and 3 student 
    required: true 
  },
});

export default mongoose.model('User', userSchema);
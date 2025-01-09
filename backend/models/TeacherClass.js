import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teacherClassSchema = new Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
});

export default mongoose.model('TeacherClass', teacherClassSchema);
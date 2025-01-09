import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const studentClassSchema = new Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
});

export default mongoose.model('StudentClass', studentClassSchema);
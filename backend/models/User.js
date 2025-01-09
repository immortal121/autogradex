import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  role: { 
    type: Number, 
    enum: [0,1,2,3], 
    required: true 
  },
});

export default mongoose.model('User', userSchema);
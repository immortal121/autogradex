import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const organizationSchema = new Schema({
  name: { type: String, required: true },
});

const Organization = mongoose.model('Organization', organizationSchema);
export default Organization;
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true,
  }
});

const User = mongoose.model('User', userSchema);

export default User;

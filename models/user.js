import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

export default User;

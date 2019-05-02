import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
const Vehicle = require('./vehicle');

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
  },
  vehicles: [{ type: ObjectId , ref: 'Vehicle' }]
});

// Kill orphans
userSchema.pre('remove', function(next) {
  Vehicle.remove({user: this}).exec();
  next();
});

const User = mongoose.model('User', userSchema);

export default User;

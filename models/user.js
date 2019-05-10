import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
const Vehicle = require('./vehicle');

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  vehicles: [{ type: ObjectId , ref: 'Vehicle' }]
});

// Kill orphans
userSchema.pre('remove', function(next) {
  Vehicle.remove({user: this}).exec();
  next();
});

userSchema.pre('save', function(next) {
  this.first_name = this.first_name.toLowerCase();
  this.last_name = this.last_name.toLowerCase();
  this.email = this.email.toLowerCase();
  next();
});

const User = mongoose.model('User', userSchema);

export default User;

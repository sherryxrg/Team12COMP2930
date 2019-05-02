import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const vehicleSchema = new mongoose.Schema({
  nickname: {
    type: String,
  },
  license_plate: {
    type: String,
    required: true,
  },
  make: {
    type: String
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const receiptSchema = new mongoose.Schema({
  license_plate: {
    type: String,
    required: true
  },
  start_time: {
    type: Date,
    required: true
  },
  end_time: {
    type: Date,
    required: true
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  lot: {
    type: ObjectId,
    ref: 'Lot',
    required: true
  },

});

const Receipt = mongoose.model('Receipt', receiptSchema);

export default Receipt;
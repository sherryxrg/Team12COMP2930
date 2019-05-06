import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
const Decimal128 = mongoose.Schema.Types.Decimal128;

const lotSchema = new mongoose.Schema({
  latitude: {
    type: Decimal128,
    required: true
  },
  longitude: {
    type: Decimal128,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  company: {
    type: ObjectId,
    required: true,
    ref: 'Company'
  },
});

const Lot = mongoose.model('Lot', lotSchema);

export default Lot;
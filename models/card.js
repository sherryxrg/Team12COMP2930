import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  number: {
    type: String,
    required: true,
    unique: true,
    get: obfuscate
  },
  cvc: {
    type: Number,
  },
  card_type: {
    type: String,
    //required: true
  },
  expiry_month: {
    type: Number,
    required: true
  },
  expiry_year: {
    type: Number,
    required: true
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },

});

function obfuscate (cc) {
  return '****-****-****-' + cc.slice(cc.length-4, cc.length);
}

const Card = mongoose.model('Card', cardSchema);

export default Card;
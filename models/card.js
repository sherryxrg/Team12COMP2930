import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  number: {
    type: Number,
    required: true,
    unique: true
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

const Card = mongoose.model('Card', cardSchema);

export default Card;
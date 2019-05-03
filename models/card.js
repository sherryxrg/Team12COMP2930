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
  card-type: {
    type: String,
    required: true
  },
  expiry: {
    type: Date,
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
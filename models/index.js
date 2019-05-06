import mongoose from 'mongoose';
import User from './user';
import Vehicle from './vehicle';
import Receipt from './receipt';
import Lot from './lot';
import Company from './company';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
};

const models = {
  User,
  Vehicle,
  Receipt,
  Lot,
  Company
};

export { connectDb };
export default models;

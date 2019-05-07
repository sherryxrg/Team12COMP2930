import mongoose from 'mongoose';
import User from './user';
import Vehicle from './vehicle';
<<<<<<< HEAD
import Card from './card';
=======
import Receipt from './receipt';
import Lot from './lot';
import Company from './company';
>>>>>>> development

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
};

const models = {
  User,
  Vehicle,
<<<<<<< HEAD
  Card,
=======
  Receipt,
  Lot,
  Company
>>>>>>> development
};

export { connectDb };
export default models;

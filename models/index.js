import mongoose from 'mongoose';
import User from './user';
import Vehicle from './vehicle';
import Card from './card';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
};

const models = {
  User,
  Vehicle,
  Card,
};

export { connectDb };
export default models;

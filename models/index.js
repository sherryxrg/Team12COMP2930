import mongoose from 'mongoose';
import User from './user';
import Vehicle from './vehicle';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
};

const models = {
  User,
  Vehicle,
};

export { connectDb };
export default models;

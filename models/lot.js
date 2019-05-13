import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
const Decimal128 = mongoose.Schema.Types.Decimal128;

const lotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lat: {
    type: Decimal128,
    required: true,
    get: getVal,
  },
  long: {
    type: Decimal128,
    required: true,
    get: getVal,
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
  rates: {
    daily: {
      until: Date,
      cost: Number 
    },
    hourly: Number
  }
});

lotSchema.pre('save', function(next) {
  while (this.number.length < 6) {
    this.number = "0" + this.number;
  }
  next();
});

const Lot = mongoose.model('Lot', lotSchema);

export default Lot;

function findCost(){ 
  var startTime = new Date(); //input current time
  var endTime = new Date(this.lotSchema.rates.hourly.endtime);
  var startHour = startTime.getHours(); 
  var startMin = startTime.getMinutes();
  var endHour = endTimeTime.getHours();
  var endMin = endTime.getMinutes();
  
  var parkTime = (endHour * 60 + endMin) - (startHour * 60 + startHour); //End time minus start time
  var hourlyTotal = parkTime * this.lotSchema.rates.hourly;
  if (hourlyTotal < dailyCost){ // returns cheaper option
    return hourlyTotal;
  } else {
    return this.lotSchema.rates.daily.cost;
  }
}

function getVal(c) {
  return parseFloat(c);
}

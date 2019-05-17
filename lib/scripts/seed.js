require('dotenv').config();
const url = process.env.DATABASE_URL;
const mongoose = require('mongoose');
mongoose.connect(url, {useNewUrlParser: true});
const db = mongoose.connection;
const models = require('../../models').default;

const Lot = models.Lot;
const Company = models.Company;

let coords = [
  { lat: 49.25410, long: -123.00334, },
  { lat: 49.25410, long: -123.00239, },
  { lat: 49.25388, long: -123.00182, },
  { lat: 49.25333, long: -123.00334, },
  { lat: 49.24973, long: -122.99897, },
  { lat: 49.24810, long: -122.99912, },
  { lat: 49.24714, long: -122.99909, },
];

let rates = [300, 400, 500, 550, 600, 700, 750, 800, 900, 1000, 1100 ,1240]

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', async () => {

  Lot.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    }
  });

  Company.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    }
  });

  let c1 = new Company({ name: "Impark" });
  c1.save((err) => { console.log(err); });
  let c2 = new Company({ name: "EasyPark" });
  c2.save((err) => { console.log(err); });
  let c3 = new Company({ name: "Diamond" });
  c3.save((err) => { console.log(err); });

  const arr = [c1, c2, c3];

  for (let i = 0; i < coords.length; i++) {
    let lot = new Lot({
      name: `BCIT Lot #${i}`,
      lat: coords[i].lat,
      long: coords[i].long,
      number: i.toString(),
      company: arr[Math.floor(Math.random() * arr.length)]._id,
      rates: {
        daily: rates[Math.floor(Math.random() * rates.length)],
        hourly: rates[Math.floor(Math.random() * rates.length)]
      }
    });

    console.log(lot);

    lot.save((err) => { if (err) {console.log(err);} });
  }

}).then(() => {
  db.close();
});

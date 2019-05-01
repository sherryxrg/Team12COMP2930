# parked
Parking-payment app for 2930 project course

## Mongoose + MongoDB, Node + Express, EJS + Bootstrap

## Base Instructions
1. Go to where you want your `parked` directory to end up (eg. Desktop, Repos, School, etc)
2. `git clone https://github.com/sxrg/Team12COMP2930/ parked`
3. `npm install`
4. `touch .env`
5. `echo "PORT=4000" >> .env`
..- Use whatever port you want here. Skip this step to default to `3000`
6. `echo "DATABASE_URL=mongodb://localhost/parked" >> .env`
7. `echo "ERASE_DB=true" >>.env`

## Install MongoDB
[MacOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
[Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

## Create database
1. Run `mongo` in terminal
2. Once your cursor is just a `>`, type `use parked`
3. Should say `switched to db parked`

## Do the thing
`npm run dev` to start the server. Message me on discord if anything breaks.

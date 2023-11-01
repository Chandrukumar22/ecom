const models = {};
const mongoose = require('mongoose');
const CONFIG = require('./config/config')

mongoose.Promise = global.Promise;
const mongo_location = CONFIG.MONGODB_URL;

mongoose.connect(mongo_location, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: false
}).catch((err) => {
  console.log('*** Can Not Connect to Mongo Server in PROCESS.db',)
  console.log(err)
})

let database = mongoose.connection;
module.exports = database;
database.once('open', () => {
  console.log(`Connected to Database at MONGODB_URI in PROCESS.db`);
})
database.on('error', (error) => {
  console.log("error", error);
})

module.exports = models;

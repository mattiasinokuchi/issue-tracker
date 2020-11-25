// This file defines data used in the app

// Mount database framework
const mongoose = require('mongoose')

// Connect and set up database
mongoose.connect(process.env.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Get notified if database connects successfully or not
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to database');
});

// Define schema (constructor) for MongoDB documents
const schema = new mongoose.Schema({
  title: String,
  text: String,
  created: Date,
  by: String,
  to: String,
  status: String,
  updated: Date
});

// Define model (class) for MongoDB documents
const DatabaseModel = mongoose.model("DatabaseModel", schema);

// Make model available from controller.js
module.exports = DatabaseModel;
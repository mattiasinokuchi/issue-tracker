// This file defines data used in the app

// Mount database framework
const mongoose = require('mongoose')

// Connect and set up database
mongoose.connect(process.env.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Get notified if database connects successfully or not
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  console.log('Connected to database');
});

// Define schema (constructor) for MongoDB documents
const schema = new mongoose.Schema({
  issue_title: { type: String, required: [true, 'missing field'] },
  issue_text: String,
  created_on: { type: Date, default: new Date() },
  created_by: String,
  assigned_to: String,
  status_text: { type: String, default: ''},
  updated_on: { type: Date, default: new Date() },
  open: { type: Boolean, default: true }
});

// Define model (class) for MongoDB documents
const Document = mongoose.model("Collection", schema);

// Make model available from controller.js
module.exports = Document;
// This file defines data used in the app

// Mount database framework
const mongoose = require('mongoose')

// Connect and set up database
mongoose.connect(process.env.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// Get notified if database connects successfully or not
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  console.log('Connected to database');
});

// Define schema (constructor) for MongoDB documents
const schema = new mongoose.Schema({
  assigned_to: {
    type: String,
    default: ''
  },
  status_text: {
    type: String,
    default: ''
  },
  open: {
    type: Boolean,
    default: true
  },
  issue_title: {
    type: String,
    required: [true, 'missing field']
  },
  issue_text: {
    type: String,
    required: [true, 'missing field']
  },
  created_by: {
    type: String,
    required: [true, 'missing field']
  },
  created_on: {
    type: Date
  },
  updated_on: {
    type: Date
  } 
}, { versionKey: false });

// Define model (class) for MongoDB documents
const Document = mongoose.model("Collection", schema);

// Make model available from controller.js
module.exports = Document;
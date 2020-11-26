// This file contains logic that updates data and view

// Import data model
const Document = require('./model');

// Make controller functions available from router
module.exports = {

  // Handler for reading issues...
  getIssue: async (req, res) => {
    try {
      // ...finds all documents in database... 
      let doc = await Document.find();
      // ...filters the array...
      let log = filter(doc, req.query.open);
      // ...then returns the data
      res.json(log);
    } catch(error) {
      console.log(error);
    }
  },

  // Handler for posting issues...
  postIssue: async (req, res) => {
    try {
      // ...creates a document...
      let document = new Document({
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text,
      });
      // ...saves it in the database...
      const doc = await document.save();
      // ...returns data...
      res.json({
        issue_title: doc.issue_title,
        issue_text: doc.issue_text,
        created_on: doc.created_on,
        created_by: doc.created_by,
        assigned_to: doc.assigned_to,
        status_text: doc.status_text,
        updated_on: doc.updated_on,
        _id: doc._id
      });
    } catch (error) {
      // ...or sends error message
      if (error.name == 'ValidationError') {
        res.json({ error: "required field(s) missing" });
      }
    }
  }
}

// Function for filter documents...
function filter(doc, query) {
  return doc.filter(function(el) {
    console.log(el.open, query, typeof(el.open), typeof(query));
    return el.open.toString() == query;
  });
}
// This file contains logic that updates data and view

// Import data model
const Document = require('./model');

// Make controller functions available from router
module.exports = {

  // Handler for creating issues...
  createIssue: async (req, res) => {
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
      } else {
        console.log(error);
      }
    }
  },

  // Handler for reading issues...
  readIssue: async (req, res) => {
    try {
      // ...finds requested documents in database... 
      let doc = await Document.find(req.query);
      // ...and returns the data
      res.json(doc);
    } catch(error) {
      console.log(error);
    }
  },

  // Handler for updating issues...
  updateIssue: async (req, res) => {
    try {
      // check for missing update fields...
      if (Object.keys(req.body).length < 2) {
        throw 'missing update field(s)';
      }
      // ...finds requested documents in database...
      let doc = await Document.findByIdAndUpdate(req.body._id, req.body);
      // ...and returns a message
      res.json({ 'result': 'successfully updated', '_id': doc._id });
    } catch(error) {
      // ...or sends error message
      if (error.name == 'CastError') {
        res.json({ error: 'missing _id' });
      } else if (error == 'missing update field(s)') {
        res.json({ error: 'no update field(s) sent', _id: req.body._id });
      } else {
        console.log(error);
      }
    }
  }
}

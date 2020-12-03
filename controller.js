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
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text,
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        created_on: new Date(),
        updated_on: new Date()
      });
      // ...saves it in the database...
      const doc = await document.save();
      // ...returns data...
      res.json({
        assigned_to: doc.assigned_to,
        status_text: doc.status_text,
        open: doc.open,
        _id: doc._id,
        issue_title: doc.issue_title,
        issue_text: doc.issue_text,
        created_by: doc.created_by,
        created_on: doc.created_on,
        updated_on: doc.updated_on
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
      // ...or sends error message
      if (error.name == 'CastError') {
        res.json({ error: 'missing _id' });
      } else {
        console.log(error);
      }
    }
  },

  // Handler for updating issues...
  updateIssue: async (req, res) => {
    try {
      let request = req.body;
      // ...checks for missing update fields...
      if (Object.keys(request).length < 2) {
        throw 'missing update field(s)';
      }
      // ...adds new date/time for updated_on to request...
      request.updated_on = new Date();
      // ...searches and updates requested documents in database...
      let doc = await Document.findByIdAndUpdate(req.body._id, request);
      // ...checks if document is found...
      if (!doc) throw 'invalid id';
      // ...returns a message...
      res.json({ result: 'successfully updated', '_id': doc._id });
    } catch(error) {
      // ...or sends error message
      if (error.name == 'CastError') {
        res.json({ error: 'missing _id' });
      } else if (error == 'invalid id') {
        res.json({ error: "could not update", "_id": req.body._id });
      } else if (error == 'missing update field(s)') {
        res.json({ error: 'no update field(s) sent', _id: req.body._id });
      } else {
        console.log(error);
      }
    }
  },

  // Handler for deleting issues...
  deleteIssue: async (req, res) => {
    try {
      // ...finds and deletes requested document in database... 
      let doc = await Document.findByIdAndDelete(req.body._id, req.body);
      // ...checks if document is found...
      if (!doc) throw 'invalid id';
      // ...returns message...
      res.json( { result: 'successfully deleted', '_id': doc._id } );
    } catch(error) {
      // ...or error message
      if (error.name == 'CastError') {
        res.json({ error: "missing _id" });
      } else if (error == 'invalid id') {
        res.json({ error: "could not delete", "_id": req.body._id });
      } else {
        console.log(error);
      }
    }
  }
}

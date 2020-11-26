// This file contains logic that updates data and view

// Import data model
const Database = require('./model');

// Make controller functions available from router
module.exports = {

  // Handler for reading issues...
  getIssue: async (req, res) => {
    try {
      // ...finds all documents in database... 
      let doc = await Database.find();
      // ...then returns the data
      res.json(doc);
    } catch(error) {
      console.log(error);
    }
  },

  // Handler for posting issues...
  postIssue: async (req, res) => {
    try {
      // ...creates a document...
      let document = new Database({
        title: req.body.issue_title,
        text: req.body.issue_text,
        by: req.body.created_by,
        to: req.body.assigned_to,
        status: req.body.status_text,
      });
      // ...saves it in the database...
      const doc = await document.save();
      // ...returns data...
      res.json({
        title: doc.title,
        text: doc.text,
        created: doc.created,
        by: doc.by,
        to: doc.to,
        status: doc.status,
        updated: doc.updated,
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

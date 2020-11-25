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
      let document = new Database({title: req.body.title});
      // ...saves it in the database...
      const doc = await document.save();
      // ...and returns some data
      res.json({
        username: doc.title,
        _id: doc._id
      });
    } catch (error) {
      console.log(error);
    }
  }
}
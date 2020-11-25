// This file contains logic that updates data and view

// Import data model
const DatabaseModel = require('./model');

// Make controller functions available from router
module.exports = {

  // Function for request to read all issues...
  getIssues: async(req, res) => {
    try {
      // ...finds all documents in database... 
      let doc = await DatabaseModel.find();
      // ...then returns the data
      res.json(doc);
    } catch(error) {
      console.log(error);
    }
  }
}

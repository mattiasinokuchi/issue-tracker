/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

// Import controller functions
const controller = require('../controller');

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(controller.getIssue)
    
    .post(controller.postIssue)
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};

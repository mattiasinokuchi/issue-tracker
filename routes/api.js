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
  
    .get(controller.getIssues (req, res))
    
    .post(function (req, res){
      let project = req.params.project;
      
    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};

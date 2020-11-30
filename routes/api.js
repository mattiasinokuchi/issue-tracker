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
  
    .post(controller.createIssue)
    
    .get(controller.readIssue)
    
    .put(controller.updateIssue)
    
    .delete(controller.deleteIssue);
    
};

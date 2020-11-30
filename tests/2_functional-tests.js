/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
let test_id = null;

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
  suite('POST /api/issues/{project}', function() {
    
    test('Every field filled in', function(done) {
      chai.request(server)
      .post('/api/issues/test')
      .send({
        issue_title: 'Title',
        issue_text: 'text',
        created_by: 'Functional Test - Every field filled in',
        assigned_to: 'Chai and Mocha',
        status_text: 'In QA'
      })
      .end(function(err, res){
        test_id = res.body._id;
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, 'Title');
        assert.equal(res.body.issue_text, 'text');
        assert.equal(res.body.created_by, 'Functional Test - Every field filled in');
        assert.equal(res.body.assigned_to, 'Chai and Mocha');
        assert.equal(res.body.status_text, 'In QA');
        done();
      });
    });
    
    test('Required fields filled in, Optional Fields Blank', function(done) {
      chai.request(server)
      .post('/api/issues/test')
      .send({
        issue_title: 'Title',
        issue_text: 'text',
        created_by: 'Functional Test - Required fields filled in, Optional Fields Blank',
        assigned_to: '',
        status_text: ''
      })
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, 'Title');
        assert.equal(res.body.issue_text, 'text');
        assert.equal(res.body.created_by, 'Functional Test - Required fields filled in, Optional Fields Blank');
        assert.equal(res.body.assigned_to, '');
        assert.equal(res.body.status_text, '');
        done();
      });
    });
    
    test('Missing required fields => { error: "required field(s) missing" }', function(done) {
      chai.request(server)
      .post('/api/issues/test')
      .send({
        issue_title: '',
        issue_text: '',
        created_by: '',
        assigned_to: '',
        status_text: ''
      })
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "required field(s) missing" });
        done();
      });
    });    
  });

  suite('GET /api/issues/{project}', function() {
    
    test('No filter', function(done) {
      chai.request(server)
      .get('/api/issues/test')
      .query({})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        assert.property(res.body[0], 'issue_title');
        assert.property(res.body[0], 'issue_text');
        assert.property(res.body[0], 'created_on');
        assert.property(res.body[0], 'updated_on');
        assert.property(res.body[0], 'created_by');
        assert.property(res.body[0], 'assigned_to');
        assert.property(res.body[0], 'open');
        assert.property(res.body[0], 'status_text');
        assert.property(res.body[0], '_id');
        done();
      });
    });
    
    test('One filter', function(done) {
      chai.request(server)
      .get('/api/issues/test')
      .query({ _id: test_id })
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.body[0]._id, test_id);
        done();
      });
    });
    
    test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
      chai.request(server)
      .get('/api/issues/test')
      .query({ open: true, assigned_to: "Chai and Mocha", issue_title: "Title" })
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.body[0].open.toString(), 'true');
        assert.notEqual(res.body[0].assigned_to, "Chai and Coffe");
        assert.equal(res.body[0].issue_title, 'Title');
        done();
      });
    });
  
  });
  
  suite('PUT /api/issues/{project}', function() {
    test('One field to update => {result: "successfully updated", _id: _id}', function(done) {
      chai.request(server)
      .put('/api/issues/test')
      .send({ _id: test_id,
        status_text: 'One field updated'
      })
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { result: 'successfully updated', _id: test_id });
        done();
      });
    });
    
    test('Multiple fields to update => {result: "successfully updated", _id: _id}', function(done) {
      chai.request(server)
      .put('/api/issues/test')
      .send({ _id: test_id,
        issue_title: 'It is getting better!',
        issue_text: 'Run for it!',
        assigned_to: 'Everyone!'
      })
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { result: 'successfully updated', _id: test_id });
        done();
      });
    });

    test('No _id submitted => { error: "missing _id" }', function(done) {
      chai.request(server)
      .put('/api/issues/test')
      .send({ _id: '',
        issue_title: 'Undefined'
      })
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "missing _id" });
        done();
      });
    });

    test('No fields to update => { error: "no update field(s) sent", _id: _id }', function(done) {
      chai.request(server)
      .put('/api/issues/test')
      .send({ _id: test_id })
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "no update field(s) sent", _id: test_id });
        done();
      });
    });
/*
    test('Invalid _id => { error: "missing _id" }', function(done) {
      
      //done();
    });
    
  });
   
  
  suite('DELETE /api/issues/{project}', function() {

    test('Valid _id', function(done) {
      
      //done();
    });
    test('Invalid _id => { error: "could not delete", "_id": _id }', function(done) {
      const badId = "5f665eb46e296f6b9b6a504d";
      
      //done();
    });
    
    test('No _id => { error: "missing _id" }', function(done) {

      //done();
    });*/
  });
});

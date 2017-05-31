var chai = require('chai');
var request = require('supertest');
var expect = chai.expect;

var app = require('../../src/server-config');

xdescribe('/api/users', function() {
  it('should return 200 status code', function(done) {
    request(app).get('/api/users').end(function(err, res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});

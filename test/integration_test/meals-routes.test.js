var chai = require('chai');
var request = require('supertest');
var db = require('../../src/models');
var expect = chai.expect;

chai.use(require('chai-json-schema'));

var app = require('../../src/server-config');

describe('/api/meals', function() {
  it('should send back an array', function(done) {
    request(app)
      .get('/api/meals')
      .expect(200)
      .expect(function(res) {
        expect(res.body).to.be.an('array');
      })
      .end(done);
  });
});

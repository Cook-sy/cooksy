var chai = require('chai');
var request = require('supertest');
var jwt = require('jsonwebtoken');
var db = require('../../src/models');
var expect = chai.expect;

chai.use(require('chai-json-schema'));

var app = require('../../src/server-config');

describe('User account creation', function() {
  beforeEach(function(done) {
    db.User
      .destroy({
        where: {
          username: 'oicki'
        }
      })
      .then(function() {
        done();
      });
  });

  it('should create a new user on signup', function(done) {
    request(app)
      .post('/api/users/signup')
      .send({
        username: 'oicki',
        password: 'hunter2',
        zipcode: '00000'
      })
      .expect(201)
      .expect(function() {
        db.User
          .findOne({
            where: {
              username: 'oicki'
            }
          })
          .then(function(user) {
            expect(user.username).to.equal('oicki');
          });
      })
      .end(done);
  });

  it('should return an auth token on successful signup', function(done) {
    request(app)
      .post('/api/users/signup')
      .send({
        username: 'oicki',
        password: 'hunter2',
        zipcode: '00000'
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        expect(res.body).to.be.jsonSchema({
          type: 'object',
          required: ['success', 'token'],
          properties: {
            success: true,
            token: {
              type: 'string',
              pattern: '(.*?).(.*?).(.*?)'
            }
          }
        });
      })
      .end(done);
  });

  it('should return a payload with username and zipcode', function(done) {
    request(app)
      .post('/api/users/signup')
      .send({
        username: 'oicki',
        password: 'hunter2',
        zipcode: '00000'
      })
      .expect(function(res) {
        var decoded = jwt.decode(res.body.token);
        expect(decoded.user).to.equal('oicki');
        expect(decoded.zipcode).to.equal('00000');
      })
      .end(done);
  });
});

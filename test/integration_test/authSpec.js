var chai = require('chai');
var request = require('supertest');
var db = require('../../src/models');
var expect = chai.expect;

chai.use(require('chai-json-schema'));

var app = require('../../src/server-config');

describe('/api/users/login', function() {
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
});

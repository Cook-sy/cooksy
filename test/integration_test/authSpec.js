var chai = require('chai');
var request = require('supertest');
var db = require('../../src/models');
var expect = chai.expect;

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
});

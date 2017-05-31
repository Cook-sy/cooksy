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

  after(function(done) {
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

describe('User account login', function() {
  before(function(done) {
    db.User
      .create({
        username: 'oicki',
        password: 'hunter2',
        zipcode: '00000'
      })
      .then(function() {
        return db.User.destroy({
          where: { username: 'bonopono' }
        });
      })
      .then(function() {
        done();
      });
  });

  after(function(done) {
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

  it('should return an auth token on successful login', function(done) {
    request(app)
      .post('/api/users/login')
      .send({
        username: 'oicki',
        password: 'hunter2'
      })
      .expect(200)
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
      .post('/api/users/login')
      .send({
        username: 'oicki',
        password: 'hunter2'
      })
      .expect(function(res) {
        var decoded = jwt.decode(res.body.token);
        expect(decoded.user).to.equal('oicki');
        expect(decoded.zipcode).to.equal('00000');
      })
      .end(done);
  });

  it('should not login a user that does not exist', function(done) {
    request(app)
      .post('/api/users/login')
      .send({
        username: 'bonopono',
        password: 'password'
      })
      .expect(400)
      .expect(function(res) {
        expect(res.body.token).to.be.undefined;
      })
      .end(done);
  });

  it('should not login user that input an incorrect password', function(done) {
    request(app)
      .post('/api/users/login')
      .send({
        username: 'oicki',
        password: 'wrongpassword'
      })
      .expect(400)
      .expect(function(res) {
        expect(res.body.token).to.be.undefined;
      })
      .end(done);
  });
});

describe('Chef account creation', function() {
  beforeEach(function(done) {
    db.Chef
      .destroy({
        where: {
          username: 'oicki'
        }
      })
      .then(function() {
        done();
      });
  });

  after(function(done) {
    db.Chef
      .destroy({
        where: {
          username: 'oicki'
        }
      })
      .then(function() {
        done();
      });
  });

  it('should create a new chef on signup', function(done) {
    request(app)
      .post('/api/chefs/signup')
      .send({
        username: 'oicki',
        password: 'hunter2',
        image: '',
        address: '123 Main St.',
        city: 'Springfield',
        state: 'IL',
        zipcode: '00000'
      })
      .expect(201)
      .expect(function() {
        db.Chef
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
      .post('/api/chefs/signup')
      .send({
        username: 'oicki',
        password: 'hunter2',
        image: '',
        address: '123 Main St.',
        city: 'Springfield',
        state: 'IL',
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
      .post('/api/chefs/signup')
      .send({
        username: 'oicki',
        password: 'hunter2',
        image: '',
        address: '123 Main St.',
        city: 'Springfield',
        state: 'IL',
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

describe('Chef account login', function() {
  before(function(done) {
    db.Chef
      .create({
        username: 'oicki',
        password: 'hunter2',
        image: '',
        address: '123 Main St.',
        city: 'Springfield',
        state: 'IL',
        zipcode: '00000'
      })
      .then(function() {
        return db.Chef.destroy({
          where: { username: 'bonopono' }
        });
      })
      .then(function() {
        done();
      });
  });

  after(function(done) {
    db.Chef
      .destroy({
        where: {
          username: 'oicki'
        }
      })
      .then(function() {
        done();
      });
  });

  it('should return an auth token on successful login', function(done) {
    request(app)
      .post('/api/chefs/login')
      .send({
        username: 'oicki',
        password: 'hunter2'
      })
      .expect(200)
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
      .post('/api/chefs/login')
      .send({
        username: 'oicki',
        password: 'hunter2'
      })
      .expect(function(res) {
        var decoded = jwt.decode(res.body.token);
        expect(decoded.user).to.equal('oicki');
        expect(decoded.zipcode).to.equal('00000');
      })
      .end(done);
  });

  it('should not login a chef that does not exist', function(done) {
    request(app)
      .post('/api/chefs/login')
      .send({
        username: 'bonopono',
        password: 'password'
      })
      .expect(400)
      .expect(function(res) {
        expect(res.body.token).to.be.undefined;
      })
      .end(done);
  });

  it('should not login chef that input an incorrect password', function(done) {
    request(app)
      .post('/api/chefs/login')
      .send({
        username: 'oicki',
        password: 'wrongpassword'
      })
      .expect(400)
      .expect(function(res) {
        expect(res.body.token).to.be.undefined;
      })
      .end(done);
  });
});

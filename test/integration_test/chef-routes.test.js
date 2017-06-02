var chai = require('chai');
var request = require('supertest');
var Promise = require('bluebird');
var db = require('../../src/models');
var expect = chai.expect;

chai.use(require('chai-json-schema'));

var app = require('../../src/server-config');

describe('/api/chefs', function() {
  var chefToken;
  var userToken;

  var mealObj = {
    name: 'rubber',
    description: 'tastee',
    deliveryDateTime: '2018-04-02T00:57:18Z',
    pickupInfo: 'knock please',
    price: '5.12',
    servings: 20,
    images: '',
    address: '123 Main Ave',
    city: 'Metro',
    state: 'AI',
    zipcode: '29921'
  };

  before(function(done) {
    var chefSignup = request(app)
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
    .then(function(res) {
      chefToken = res.body.token;
    });

    var userSignup = request(app)
    .post('/api/users/signup')
    .send({
      username: 'oicki',
      password: 'hunter2',
      zipcode: '00000'
    })
    .then(function(res) {
      userToken = res.body.token;
    });

    Promise.all([chefSignup, userSignup]).then(function() {
      done();
    });
  });

  afterEach(function(done) {
    db.Meal.destroy({
      where: { name: 'rubber' }
    }).then(function() {
      done();
    });
  });

  after(function(done) {
    var chefRemove = db.Chef.destroy({
      where: { username: 'oicki' }
    });
    var userRemove = db.User.destroy({
      where: { username: 'oicki' }
    });

    Promise.all([chefRemove, userRemove]).then(function() {
      done();
    });
  });

  describe('Create a new meal', function() {
    it('should not allow access if no auth token is sent', function(done) {
      request(app)
        .post('/api/chefs/meals')
        .send(mealObj)
        .expect(401)
        .end(done);
    });

    it('should not allow access if user is not a chef', function(done) {
      request(app)
        .post('/api/chefs/meals')
        .set('x-access-token', 'Bearer ' + userToken)
        .send(mealObj)
        .expect(403)
        .end(done);
    });

    it('should allow access if user is a chef', function(done) {
      request(app)
        .post('/api/chefs/meals')
        .set('x-access-token', 'Bearer ' + chefToken)
        .send(mealObj)
        .expect(201)
        .end(done);
    });

    it('should create a meal in the database', function(done) {
      request(app)
        .post('/api/chefs/meals')
        .set('x-access-token', 'Bearer ' + chefToken)
        .send(mealObj)
        .expect(201)
        .then(function() {
          db.Meal.findOne({
            where: { name: 'rubber' }
          }).then(function(meal) {
            expect(meal).to.not.be.undefined;
            done();
          });
        });
    });
  });

  describe('Get chef\'s meals', function() {
    var mealId;

    beforeEach(function(done) {
      request(app)
        .post('/api/chefs/meals')
        .set('x-access-token', 'Bearer ' + chefToken)
        .send(mealObj)
        .expect(201)
        .expect(function(res) {
          mealId = res.body.meal.id;
        })
        .end(done);
    });

    it('should send back an array', function(done) {
      request(app)
        .get('/api/chefs/meals')
        .set('x-access-token', 'Bearer ' + chefToken)
        .expect(200)
        .expect(function(res) {
          expect(res.body).to.be.an('array');
        })
        .end(done);
    });
  });

  describe('Delete a meal', function() {
    var mealId;

    beforeEach(function(done) {
      request(app)
        .post('/api/chefs/meals')
        .set('x-access-token', 'Bearer ' + chefToken)
        .send(mealObj)
        .expect(201)
        .expect(function(res) {
          mealId = res.body.meal.id;
        })
        .end(done);
    });

    afterEach(function(done) {
      db.Meal.destroy({
        where: { name: 'rubber' }
      }).then(function() {
        done();
      });
    });

    it('should not allow access if no auth token is sent', function(done) {
      request(app)
        .delete('/api/chefs/meals/' + mealId)
        .expect(401)
        .end(done);
    });

    it('should not allow access if user is not a chef', function(done) {
      request(app)
        .delete('/api/chefs/meals/' + mealId)
        .set('x-access-token', 'Bearer ' + userToken)
        .expect(403)
        .end(done);
    });

    it('should not delete if chef does not own meal', function(done) {
      request(app)
        .delete('/api/chefs/meals/' + 0)
        .set('x-access-token', 'Bearer ' + chefToken)
        .expect(403)
        .end(done);
    });

    it('should not delete if meal does not exist', function(done) {
      request(app)
        .delete('/api/chefs/meals/' + mealId + 1)
        .set('x-access-token', 'Bearer ' + chefToken)
        .expect(404)
        .end(done);
    });

    it('should delete if chef owns meal', function(done) {
      request(app)
        .delete('/api/chefs/meals/' + mealId)
        .set('x-access-token', 'Bearer ' + chefToken)
        .expect(200)
        .end(done);
    });
  });
});

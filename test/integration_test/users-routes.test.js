var chai = require('chai');
var request = require('supertest');
var db = require('../../src/models');
var expect = chai.expect;

chai.use(require('chai-json-schema'));

var app = require('../../src/server-config');

describe('/api/users', function() {
  var chefToken;
  var userToken;

  before(function(done) {
    var chefSignup = request(app)
      .post('/api/chefs/login')
      .send({ username: 'chef', password: 'chef' })
      .then(function(res) {
        chefToken = res.body.token;
      });

    var userSignup = request(app)
      .post('/api/users/login')
      .send({ username: 'user', password: 'user' })
      .then(function(res) {
        userToken = res.body.token;
      });

    Promise.all([chefSignup, userSignup]).then(function() {
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

  describe('Create a meal review', function() {
    var mealReviewObj;

    beforeEach(function(done) {
      mealReviewObj = {
        rating: 3,
        review: 'This is really good!!!',
        mealId: 1
      };
      done();
    });

    afterEach(function(done) {
      db.MealReview.destroy({
        where: { review: 'This is really good!!!' }
      }).then(function() {
        done();
      });
    });

    it('should not allow access if not a user', function(done) {
      request(app)
        .post('/api/users/meals/reviews')
        .set('x-access-token', 'Bearer ' + chefToken)
        .send(mealReviewObj)
        .expect(403)
        .end(done);
    });

    it('should create a review', function(done) {
      request(app)
        .post('/api/users/meals/reviews')
        .set('x-access-token', 'Bearer ' + userToken)
        .send(mealReviewObj)
        .expect(201)
        .end(done);
    });
  });
});

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
    var reviewText = 'AMAZING!!!!!!!!!!';
    var mealId = 1;
    var mealRating = 3;

    beforeEach(function(done) {
      mealReviewObj = {
        rating: mealRating,
        review: reviewText,
        mealId: mealId
      };
      done();
    });

    afterEach(function(done) {
      db.MealReview.destroy({
        where: { review: reviewText }
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
        .then(function() {
          db.MealReview.findOne({
            where: { review: reviewText }
          }).then(function(review) {
            expect(review).to.not.be.null;
            done();
          });
        });
    });

    it('should update the review count and rating of the corresponding meal', function(done) {
      var prevReviewCount;
      var prevRating;

      db.Meal.findById(mealId)
        .then(function(meal) {
          prevReviewCount = meal.reviewCount;
          prevRating = meal.rating;
          return meal;
        })
        .then(function() {
          return request(app)
            .post('/api/users/meals/reviews')
            .set('x-access-token', 'Bearer ' + userToken)
            .send(mealReviewObj);
        })
        .then(function() {
          return db.Meal.findById(mealId)
            .then(function(meal) {
              var newRating = (prevRating * prevReviewCount) + mealRating;
              newRating *= 1 / (prevReviewCount + 1);

              expect(meal.reviewCount).to.equal(prevReviewCount + 1);
              expect(+meal.rating).to.equal(newRating);
              done();
            });
        });
    });
  });

  describe('Get all meal reviews from a user', function() {
    var reviewObjSchema = {
      type: 'object',
      required: [
        'id',
        'rating',
        'review',
        'mealId',
        'userId'
      ],
      properties: {
        id: { type: 'integer' },
        rating: { type: 'integer' },
        review: { type: 'string' },
        mealId: { type: 'integer' },
        userId: { type: 'integer' }
      }
    };

    it('should return all meal reviews from a user', function(done) {
      request(app)
        .get('/api/users/1/meals/reviews')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function(res) {
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.be.jsonSchema(reviewObjSchema);

          db.MealReview.findAll({
            where: { userId: 1 }
          }).then(function(reviews) {
            expect(reviews.length).to.equal(res.body.length);
            done();
          });
        });
    });
  });

  describe('Update a meal review', function() {
    var mealId = 1;
    var updateText = 'SO GOOOOD!!!!!!!!';
    var updateRating = 5;
    var reviewId;

    beforeEach(function(done) {
      var mealReviewObj = {
        rating: 3,
        review: 'AMAZING!!!!!!!!!!',
        mealId: mealId,
        userId: 1
      };
      db.MealReview.create(mealReviewObj)
        .then(function(review) {
          reviewId = review.id;
          done();
        });
    });

    afterEach(function(done) {
      db.MealReview.findById(reviewId)
        .then(function(review) {
          review.destroy();
          done();
        });
    });

    it('should not allow access if not a user', function(done) {
      request(app)
        .put('/api/users/meals/reviews/' + reviewId)
        .set('x-access-token', 'Bearer ' + chefToken)
        .send({ rating: updateRating, review: updateText })
        .expect(403)
        .end(done);
    });

    it('should update a meal review', function(done) {
      request(app)
        .put('/api/users/meals/reviews/' + reviewId)
        .set('x-access-token', 'Bearer ' + userToken)
        .send({ rating: updateRating, review: updateText })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function(res) {
          expect(res.body.review.review).to.equal(updateText);
          expect(res.body.review.rating).to.equal(updateRating);
          done();
        });
    });

    xit('should update the rating of the corresponding meal', function(done) {

    });
  });
});

var chai = require('chai');
var request = require('supertest');
var db = require('../../src/models');
var expect = chai.expect;

chai.use(require('chai-json-schema'));

var app = require('../../src/server-config');

describe('/api/meals', function() {
  var regExDate = '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(.[0-9]{3})?Z$';
  var mealObjSchema = {
    type: 'object',
    required: [
      'id',
      'name',
      'description',
      'deliveryDateTime',
      'pickupInfo',
      'price',
      'servings',
      'images',
      'address',
      'city',
      'state',
      'zipcode',
      'rating',
      'numOrdered',
      'totalOrdered',
      'createdAt',
      'updatedAt',
      'chefId'
    ],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      description: { type: 'string' },
      deliveryDateTime: {
        type: 'string',
        pattern: regExDate
      },
      pickupInfo: { type: 'string' },
      price: { type: 'string' },
      servings: { type: 'integer' },
      images: { type: 'string' },
      address: { type: 'string' },
      city: { type: 'string' },
      state: { type: 'string' },
      zipcode: { type: 'string' },
      rating: { type: 'string' },
      numOrdered: { type: 'integer' },
      totalOrdered: { type: 'integer' },
      createdAt: {
        type: 'string',
        pattern: regExDate
      },
      updatedAt: {
        type: 'string',
        pattern: regExDate
      },
      chefId: { type: 'integer' }
    }
  };

  it('should send back an array', function(done) {
    request(app)
      .get('/api/meals')
      .expect(200)
      .expect(function(res) {
        expect(res.body).to.be.an('array');
      })
      .end(done);
  });

  it('should send back an array of meal objects', function(done) {
    request(app)
      .get('/api/meals')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        expect(res.body[0]).to.be.jsonSchema(mealObjSchema);
      })
      .end(done);
  });

  describe('/api/meals/:id', function() {
    it('should send a specific meal if it exists', function(done) {
      request(app)
      .get('/api/meals/4')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        expect(res.body.success).to.be.true;
        expect(res.body.meal).to.be.jsonSchema(mealObjSchema);
      })
      .end(done);
    });

    it('should not send a meal if it does not exist', function(done) {
      request(app)
      .get('/api/meals/19123')
      .expect(404)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        expect(res.body.success).to.be.false;
        expect(res.body.meal).to.be.undefined;
      })
      .end(done);
    });
  });
});

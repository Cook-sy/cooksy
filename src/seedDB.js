// eslint-disable-next-line no-unused-vars
var dotenv = require('dotenv').load();
var faker = require('faker');
// database
var db = require('./models');
// set seed for consistent results
faker.seed(20500);

console.log('Seeding database...');

var numUsers = 3;
var numChefs = 5;
var numMeals = 11;
var numChefReviews = 7;
var numMealReviews = 7;
var numPurchases = 11;
var numRequests = 7;
var numUserRequests = 11;

var zipcodes = ['94304', '94507', '94608', '94530', '93551'];
var points = [
  {
    type: 'POINT',
    coordinates: [37.374702, -122.181696]
  },
  {
    type: 'POINT',
    coordinates: [37.850410, -122.021123]
  },
  {
    type: 'POINT',
    coordinates: [37.836844, -122.289143]
  },
  {
    type: 'POINT',
    coordinates: [37.921561, -122.298337]
  },
  {
    type: 'POINT',
    coordinates: [34.604105, -118.239213]
  }
];

var options = { individualHooks: true };
var i;

var users = [];
for (i = 0; i < numUsers; i++) {
  users.push({
    username: i === 0 ? 'user' : faker.internet.userName(),
    password: i === 0 ? 'user' : faker.internet.password(),
    zipcode: zipcodes[faker.random.number() % zipcodes.length]
  });
}

var chefs = [];
for (i = 0; i < numChefs; i++) {
  chefs.push({
    username: i === 0 ? 'chef' : faker.internet.userName(),
    password: i === 0 ? 'chef' : faker.internet.password(),
    image: faker.image.avatar(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zipcode: zipcodes[faker.random.number() % zipcodes.length]
  });
}

var meals = [];
for (i = 0; i < numMeals; i++) {
  meals.push({
    name: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    deliveryDateTime: faker.date.future(),
    pickupInfo: faker.lorem.sentence(),
    price: +faker.commerce.price(),
    servings: ((faker.random.number() % 6) * 5) + 10,
    images: faker.image.food(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zipcode: zipcodes[i],
    point: points[i],
    chefId: (faker.random.number() % numChefs) + 1
  });
}

var chefReviews = [];
for (i = 0; i < numChefReviews; i++) {
  chefReviews.push({
    rating: (faker.random.number() % 5) + 1,
    chefId: (i % numChefs) + 1,
    userId: (i % numUsers) + 1
  });
}

var mealReviews = [];
for (i = 0; i < numMealReviews; i++) {
  mealReviews.push({
    rating: (faker.random.number() % 5) + 1,
    title: faker.lorem.sentence(),
    review: faker.lorem.paragraphs(),
    mealId: (faker.random.number() % numMeals) + 1,
    userId: (i % numUsers) + 1
  });
}

var requests = [];
for (i = 0; i < numRequests; i++) {
  requests.push({
    numRequired: ((faker.random.number() % 6) * 5) + 10,
    deadline: faker.date.future(),
    mealId: (i % numMeals) + 1
  });
}

var userRequests = [];
for (i = 0; i < numUserRequests; i++) {
  userRequests.push({
    num: (faker.random.number() % 3) + 1,
    requestId: (i % numRequests) + 1,
    userId: (i % numUsers) + 1
  });
}

var mealIds;
var mealPrices;

db.User.sync({ force: true })
  .then(function() { return db.Chef.sync({ force: true }); })
  .then(function() { return db.Meal.sync({ force: true }); })
  .then(function() { return db.ChefReview.sync({ force: true }); })
  .then(function() { return db.MealReview.sync({ force: true }); })
  .then(function() { return db.Purchase.sync({ force: true }); })
  .then(function() { return db.Request.sync({ force: true }); })
  .then(function() { return db.UserRequest.sync({ force: true }); })
  .then(function() { return db.User.bulkCreate(users, options); })
  .then(function() { return db.Chef.bulkCreate(chefs, options); })
  .then(function() { return db.Meal.bulkCreate(meals, options); })
  .then(function(res) {
    mealIds = res.map(function(instance) {
      return instance.id;
    });
    mealPrices = res.map(function(instance) {
      return instance.price;
    });

    return db.ChefReview.bulkCreate(chefReviews, options);
  })
  .then(function() { return db.MealReview.bulkCreate(mealReviews, options); })
  .then(function(res) {
    var purchases = [];
    for (i = 0; i < numPurchases; i++) {
      purchases.push({
        individualPrice: mealPrices[i],
        num: (faker.random.number() % 5) + 1,
        status: faker.random.number() % 3,
        mealId: mealIds[i],
        userId: (i % numUsers) + 1
      });
    }

    return db.Purchase.bulkCreate(purchases, options);
  })
  .then(function() { return db.Request.bulkCreate(requests, options); })
  .then(function() { return db.UserRequest.bulkCreate(userRequests, options); })
  .then(function() {
    db.sequelize.close();
    console.log('Finished seeding db!');
  });

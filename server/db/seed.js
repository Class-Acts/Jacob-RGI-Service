const faker = require('faker');
const controllers = require('./db-controllers.js');

const { COUNT } = process.env;

const Review = function Review(itemId, userId) {
  this.item_id = itemId;
  this.user_id = userId;
  this.date = faker.date.past(10);
  this.title = faker.lorem.sentence();
  this.body = faker.lorem.paragraph(faker.random.number(15) + 5);
  this.stars = faker.random.number(5);
  this.fit = faker.random.number(5);
  this.width = faker.random.number(5);
  this.recommend = faker.random.boolean();
};

const User = function User() {
  this.name = faker.name.findName();
  this.size = `${faker.address.countryCode()} ${faker.name.gender()}'s ${faker.random.number(36)}`;
  this.height = faker.random.number({ min: 48, max: 76 });
  this.weight = faker.random.number({ min: 80, max: 280 });
  this.age = faker.random.number({ min: 16, max: 80 });
  this.location = `${faker.address.city()}, ${faker.address.stateAbbr()}`;
};

const FoundHelpful = function FoundHelpful(reviewId, userId) {
  this.review_id = reviewId;
  this.user_id = userId;
};

for (let i = 0; i <= COUNT; i += 1) {
  const {
    insertItem,
    insertReview,
    insertUser,
    insertFoundHelpful,
  } = controllers;

  insertUser(new User());
  insertItem(new FoundHelpful());
  insertReview(new Review());
  insertFoundHelpful(i, i);

  if (i % 100 === 0) {
    console.log(`sent ${i} queries`);
  }
}

const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const controllers = require('./db-controllers.js');
const pool = require('./connection.js');
const copyCSV = require('./copyCSV.js');

const { COUNT } = process.env;


const _REVIEW = {};
const _USER = {};
const _FOUNDHELPFUL = {};

const Review = function reviewData(id, itemId, userId) {
  _REVIEW.id = id;
  _REVIEW.item_id = itemId;
  _REVIEW.user_id = userId;
  _REVIEW.date = faker.date.past(10).toISOString();
  _REVIEW.title = 'this is a title!';
  _REVIEW.body = 'this is a body!';
  _REVIEW.stars = faker.random.number(5);
  _REVIEW.fit = faker.random.number(5);
  _REVIEW.width = faker.random.number(5);
  _REVIEW.recommend = faker.random.boolean();
  return Object.assign({}, _REVIEW);
}

const User = function userData(id) {
  _USER.id = id;
  _USER.name = faker.name.findName();
  _USER.size = `${faker.address.countryCode()} ${faker.name.gender()}'s ${faker.random.number(36)}`;
  _USER.height = faker.random.number({ min: 48, max: 76 });
  _USER.weight = faker.random.number({ min: 80, max: 280 });
  _USER.age = faker.random.number({ min: 16, max: 80 });
  _USER.location = `${faker.address.city()}, ${faker.address.stateAbbr()}`;
  return _USER;
  return Object.assign({}, _USER);
};

const FoundHelpful = function foundHelpfulData(id, reviewId, userId) {
  _FOUNDHELPFUL.id = id;
  _FOUNDHELPFUL.review_id = reviewId;
  _FOUNDHELPFUL.user_id = userId;
  return Object.assign({}, _FOUNDHELPFUL);
};

const itemWriter = csvWriter({ headers: ['id'] });
const reviewWriter = csvWriter({
  headers: [
    'id',
    'item_id',
    'user_id',
    'date',
    'title',
    'body',
    'stars',
    'fit',
    'width',
    'recommend',
  ],
});
const userWriter = csvWriter({
  headers: [
    'id',
    'name',
    'size',
    'height',
    'weight',
    'age',
    'location',
  ],
});
const foundHelpfulWriter = csvWriter({
  headers: [
    'id',
    'review_id',
    'user_id',
  ],
});

const csvPath = `${__dirname}/csv/`;
const itemCSVpath = `${csvPath}itemSeed.csv`;
const reviewCSVpath = `${csvPath}reviewSeed.csv`;
const userCSVpath = `${csvPath}userSeed.csv`;
const foundHelpfulCSVpath = `${csvPath}foundHelpfulSeed.csv`;

try {
  fs.unlinkSync(itemCSVpath);
  fs.unlinkSync(reviewCSVpath);
  fs.unlinkSync(userCSVpath);
  fs.unlinkSync(foundHelpfulCSVpath);
} catch {
  //
}

itemWriter.pipe(fs.createWriteStream(itemCSVpath));
reviewWriter.pipe(fs.createWriteStream(reviewCSVpath));
userWriter.pipe(fs.createWriteStream(userCSVpath));
foundHelpfulWriter.pipe(fs.createWriteStream(foundHelpfulCSVpath));

// Create files in order of schema dependencies
// items > users > reviews > found_helpful
// Load into postgres synchronously?

// Random number of users per seed (at 10m: max of 1m, min of 100k)
const userCOUNT = faker.random.number({
  min: (COUNT / 100),
  max: (COUNT / 10),
});

// Need to store amount of randomized rows to make sure ids are always unique
let REVIEW_ID = 0;
let FOUND_HELPFUL_ID = 1;
const userDrainIds = [];
const userDrainReviews = [];

const writeData = (async (cb = (()=>{}), step = 1, offset = 0) => {
for (let i = (1 + offset); i <= COUNT; i += step) {
  if (!itemWriter.write({ id: i })) {
    await new Promise(resolve => itemWriter.once('drain', resolve))
    console.log(`draining item ${i}`);
  }
  if (i <= userCOUNT) {
    if (!userWriter.write(User(i))) {
      await new Promise(resolve => itemWriter.once('drain', resolve))
    }
  }
  const reviewsOnThisItem = faker.random.number(5);
  for (let j = 0; j < reviewsOnThisItem; j+= 1) {
    const userId = faker.random.number({
      min: 1,
      max: userCOUNT});
    REVIEW_ID += 1;
    if (!reviewWriter.write(Review(REVIEW_ID, i, userId))) {
      await new Promise(resolve => reviewWriter.once('drain', resolve));
    }
    const usersFoundHelpful = faker.random.number({
      min: 0,
      max: 4
    });
    const usedUsers = {};
    for (let k = 1; k <= usersFoundHelpful; k += 1) {
      const reviewId = j;
      let uniqueUserId = faker.random.number({
        min: 1,
        max: userCOUNT,
      });
        // Reassign if we already used that person
      while (usedUsers[uniqueUserId] !== undefined) {
        uniqueUserId = faker.random.number({
          min: 1,
          max: userCOUNT,
        });
      }
      // Make sure we don't use them again once we find unique
      usedUsers[uniqueUserId] = true;
      if (!foundHelpfulWriter.write(FoundHelpful(FOUND_HELPFUL_ID, REVIEW_ID, uniqueUserId))) {
        userDrainIds.push(uniqueUserId);
        userDrainReviews.push(REVIEW_ID);
        await new Promise(resolve => foundHelpfulWriter.once('drain', resolve))
      }
      FOUND_HELPFUL_ID += 1;
    }
  }
  if (i % 10000 === 0) {
    console.timeEnd('10kTime');
    console.time('10kTime');
    console.timeLog('seedTime');
    console.log(`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}---${i}-${REVIEW_ID}-${FOUND_HELPFUL_ID}`);
  }
}
cb();
});

console.time('seedTime');
writeData(() => {
  console.timeEnd('seedTime');
  copyCSV();
});
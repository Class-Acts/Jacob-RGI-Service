const faker = require('faker');
const controllers = require('./db-controllers.js');
const database = 'reviews';

const items = 100;

const weights = [
 '100-125 lbs.', '125-150 lbs.', '150-175 lbs.', '175-200 lbs.', '200-225 lbs.', '225-250 lbs.', '250-275 lbs.', '275-300 lbs.', '300-325 lbs.', '325-350 lbs.'
];

const ages = [
 '15-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85-94'
];

const randomNumber = (min, max) => {
 return Math.floor(Math.random() * (max - min) + min);
}

const genderSwitcher = (boolean) => {
 if (boolean) {
   return 'Mens'
 } else {
   return 'Womens'
 }
}

const userObjs = () => {
  let dataHolder = [];
  for (let index = 0; index < items; index ++) {
    let reviewers = randomNumber(0, 30);
    for (let i = 0; i < reviewers; i++) {
      let userObj = {};
      userObj.name = faker.name.findName();
      userObj.numberOfReviews = randomNumber(1, 6);
      userObj.typicalSize = genderSwitcher(faker.random.boolean()) + ' ' + randomNumber(5, 14);
      userObj.height = randomNumber(5, 7) + '\'' + randomNumber(0, 12) + '\"';
      userObj.weight = weights[randomNumber(0, weights.length)];
      userObj.age = ages[randomNumber(0, ages.length)];
      userObj.location = faker.address.city() + ' ' + faker.address.state();
      dataHolder.push(userObj);
   }
 }
  return dataHolder;
}

const reviewObjs = () => {
  let dataHolder = [];
  for (let index = 0; index < items; index ++) {
    let reviews = randomNumber(0, 60);
    for (let i = 0; i < reviews; i++) {
      let reviewObj = {};
      reviewObj.shoeId = randomNumber(0, 101);
      reviewObj.userId = randomNumber(0, 1200);
      reviewObj.date = faker.date.past(5);
      reviewObj.title = faker.lorem.sentence();
      reviewObj.body = faker.lorem.paragraph();
      reviewObj.stars = randomNumber(1, 6);
      reviewObj.fit = randomNumber(0, 3);
      reviewObj.width = randomNumber(0, 3);
      reviewObj.helpful = randomNumber(0, 101);
      reviewObj.notHelpful = randomNumber(0, 101);
      reviewObj.recommended = randomNumber(0, 2);
      dataHolder.push(reviewObj);
    }
  }
  return dataHolder;
}

const seedUsers = () => {
  let data = userObjs();
  let chunks = [[]];
  let counter = 0;
  let chunkCount = 0;

  for (let i = 0; i < data.length; i ++) {
    counter ++;
    if (counter === 100) {
      chunks.push([]);
      counter = 0;
      chunkCount ++;
    }
    let user = [];
    user.push(i + 1);
    user.push(data[i].name);
    user.push(data[i].numberOfReviews);
    user.push(data[i].typicalSize);
    user.push(data[i].height);
    user.push(data[i].weight);
    user.push(data[i].age);
    user.push(data[i].location);
    chunks[chunkCount].push(user);
  }

  controllers.truncateTable('users', (err) => {
    if (err) {
      console.log('cannot truncate');
    }
  });

  chunks.forEach((chunk) => {
    controllers.insertData(chunk, 'users', (err) => {
      if (err) {
        console.log('seeding insert err', err);
      }
    })
  })
}

const seedReviews = () => {
  let data = reviewObjs();
  let chunks = [[]];
  let counter = 0;
  let chunkCount = 0;

  for (let j = 0; j < data.length; j ++) {
    counter ++;
    if (counter === 100) {
      chunks.push([]);
      counter = 0;
      chunkCount ++;
      console.log(chunkCount);
    }
    let item = [];
    item.push(j + 1);
    item.push(data[j].shoeId);
    item.push(data[j].userId);
    item.push(data[j].date);
    item.push(data[j].title);
    item.push(data[j].body);
    item.push(data[j].stars);
    item.push(data[j].fit);
    item.push(data[j].width);
    item.push(data[j].helpful);
    item.push(data[j].notHelpful);
    item.push(data[j].recommended);
    chunks[chunkCount].push(item);
  }

  controllers.truncateTable('reviews', (err) => {
    if (err) {
      console.log('cannot truncate');
    }
  });

  chunks.forEach((chunk) => {
    controllers.insertData(chunk, 'reviews', (err) => {
      if (err) {
        console.log('seeding insert err', err);
      }
    })
  })
}

seedUsers();
seedReviews();
//users categories - name, number of reviews, typical size, height, weight, age, location

//reviews categories - shoe id, user id, date, title, body, stars, fit, width, helpful, recomended

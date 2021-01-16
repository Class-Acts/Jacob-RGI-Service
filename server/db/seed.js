const faker = require('faker');
//const db = require("./reviews-database.sql");
const mysql = require('mysql');
const Promise = require('bluebird');
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
   let reviews = randomNumber(0, 40);
   for (let i = 0; i < reviews; i++) {
     let userObj = {};
     userObj.shoeId = randomNumber(0, 101);
     userObj.userId = randomNumber(0, 1200);
     userObj.date = faker.date.past();
     userObj.title = faker.lorem.sentence();
     userObj.body = faker.lorem.paragraph();
     userObj.stars = randomNumber(0, 6);
     userObj.fit = randomNumber(0, 2);
     userObj.width = randomNumber(0, 2);
     userObj.helpful = randomNumber(0, 101);
     userObj.recommended = randomNumber(0, 2);
     dataHolder.push(userObj);
   }
 }
 return dataHolder;
}

const moduleData = () => {
 let data = {};
 data.users = userObjs();
 data.reviews = reviewObjs();
 return data;
}


const connection = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: 'password',
 database: 'reviews'
});

connection.connect((err) => {
 if (err) {
   console.log(err);
 } else {
   connection.query('TRUNCATE users', (err, result) => {
     if (err) {
       console.log(err);
     } else {
       console.log('truncated!');
     }
   });
   connection.query('TRUNCATE reviews', (err, result) => {
     if (err) {
       console.log(err);
     } else {
       console.log('something else!');
     }
   });
   console.log('connected');
   let seedData = moduleData();
   let query = "INSERT INTO users VALUES ?"
   let userValues = [];
   let index = 100;
   for (let i = 0; i < index; i ++) {
     let item = [];
     item.push(i + 1);
     item.push(seedData.users[i].name);
     item.push(seedData.users[i].numberOfReviews);
     item.push(seedData.users[i].typicalSize);
     item.push(seedData.users[i].height);
     item.push(seedData.users[i].weight);
     item.push(seedData.users[i].age);
     item.push(seedData.users[i].location);
     userValues.push(item);
   }
   connection.query(query, [userValues], (err, result) => {
     if (err) {
       console.log(err);
     } else {
       console.log('inserted!');
     }
   })
   let query2 = "INSERT INTO reviews VALUES ?"
   let reviewValues = [];
   for (let j = 0; j < index; j ++) {
     let item = [];
     item.push(j + 1);
     item.push(seedData.reviews[j].shoeId);
     item.push(seedData.reviews[j].userId);
     item.push(seedData.reviews[j].date);
     item.push(seedData.reviews[j].title);
     item.push(seedData.reviews[j].body);
     item.push(seedData.reviews[j].stars);
     item.push(seedData.reviews[j].fit);
     item.push(seedData.reviews[j].width);
     item.push(seedData.reviews[j].helpful);
     item.push(seedData.reviews[j].recommended);
     reviewValues.push(item);
   }
   connection.query(query2, [reviewValues], (err, result) => {
     if (err) {
       console.log(err);
     } else {
       console.log('inserted!');
     }
   }
 )
 }
})


module.exports = connection;

//users categories - name, number of reviews, typical size, height, weight, age, location

//reviews categories - shoe id, user id, date, title, body, stars, fit, width, helpful, recomended

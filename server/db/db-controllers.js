const connection = require('./connection.js');

const connect = () => {
  return connection.connect((err) => {
    if (err) {
      console.log('cannot connect to db', err);
    } else {
      console.log('connected to db');
    }
  });
}

const dropDatabase = () => {
  return connection.query(`DROP DATABASE reviews`);
}

const buildDatabase = () => {
  return connection.query('CREATE DATABASE IF NOT EXISTS reviews');
}

const useDatabase = () => {
  return connection.query(`USE reviews`);
}

const buildReviewsTable = () => {
  return connection.query(`
  CREATE TABLE IF NOT EXISTS users (

    id smallint not null auto_increment,
    name varchar(40) not null,
    number_reviews tinyint not null,
    typical_size varchar(20) not null,
    height varchar(20) not null,
    weight varchar(30) not null,
    age varchar(30),
    location varchar(50) not null,
    primary key (id)
    )
  `);
}

const buildUsersTable = () => {
  return connection.query(`
  CREATE TABLE IF NOT EXISTS reviews (

    id smallint not null auto_increment,
    shoe_id smallint not null,
    user_id smallint not null references users(id),
    review_date date not null,
    title varchar(200) not null,
    body varchar(4000) not null,
    stars tinyint not null,
    fit tinyint not null,
    width tinyint not null,
    helpful tinyint not null,
    not_helpful tinyint not null,
    recommended tinyint(1) not null,
    primary key (id)
    )
  `)
}


const truncateTable = (tablename, cb) => {
  connection.query('TRUNCATE ' + tablename, (err, results) => {
    if (err) {
      console.log('cannot truncate ' + tablename);
    } else {
      console.log('truncated ' + tablename);
      cb(null, results);
    }
  })
}

const insertData = (data, tablename, cb) => {
  let query = 'INSERT INTO ' + tablename + ' VALUES ?';
  connection.query(query, [data], (err, results) => {
    if (err) {
      console.log('err', err);
    } else {
      console.log('inserted data at ' + tablename);
      cb(null, results);
    }
  })
}


const getReviewData = (shoeId, cb) => {
  connection.query('USE reviews', (err) => {
    if (err) {
      console.log('could not use reviews', err);
    } else {
      connection.query('SELECT * FROM reviews WHERE shoe_id = ' + shoeId, (err, results) => {
        if (err) {
          console.log('error querying the reviews table', err);
        } else {
          console.log('success querying the reviews table');
          let responseData = [];
          let counter = 0;
          responseData.push([results]);
          results.forEach((review) => {
            connection.query('SELECT * FROM users WHERE id = ' + review.user_id, (err, data) => {
              if (err) {
                console.log(err);
              } else {
                responseData.push(data);
                counter ++
                if (counter === results.length) {
                  cb(null, responseData);
                }
              }
            })
          })
        }
      })
    }
  })
}


module.exports = {
  connect,
  dropDatabase,
  buildDatabase,
  useDatabase,
  buildReviewsTable,
  buildUsersTable,
  truncateTable,
  insertData,
  getReviewData
}
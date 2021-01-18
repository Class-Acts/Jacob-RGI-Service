const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'reviews'
 });

connection.connect((err) => {
  if (err) {
    console.log('cannot connect to db');
  } else {
    console.log('connected to db!');
  }
})

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
  connection.query('SELECT * FROM reviews WHERE shoe_id = ' + shoeId, (err, results) => {
    if (err) {
      console.log('error querying the db', err);
    } else {
      console.log('success querying db');
      cb(null, results);
    }
  })
}

module.exports = {
  truncateTable,
  insertData,
  getReviewData
}
const pool = require('./connection.js');

// Controllers
const insertItem = (client) => {
  const connection = client || pool;
  const text = 'INSERT INTO items DEFAULT VALUES;';
  return connection.query(text);
};

const insertReview = (client, data) => {
  const connection = client || pool;
  const values = [
    data.item_id,
    data.user_id,
    data.date,
    data.title,
    data.body,
    data.stars,
    data.fit,
    data.width,
    data.recommend,
  ];
  const text = `INSERT INTO reviews (
    item_id,
    user_id,
    date,
    title,
    body,
    stars,
    fit,
    width,
    recommend
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9
  );`;
  return connection.query(text, values);
};

const insertUser = (client, data) => {
  const connection = client || pool;
  const values = [
    data.name,
    data.size,
    data.height,
    data.weight,
    data.age,
    data.location,
  ];
  const text = `INSERT INTO users (
    name,
    size,
    height,
    weight,
    age,
    location
  ) VALUES (
    $1, $2, $3, $4, $5, $6
  );`;
  return connection.query(text, values);
};

const insertFoundHelpful = (client, data) => {
  const connection = client || pool;
  const values = [data.review_id, data.user_id];
  const text = 'INSERT INTO found_helpful (review_id, user_id) VALUES ($1, $2);';
  return connection.query(text, values);
};

const getReviewData = (itemId, cb) => {
  pool.query(`SELECT * FROM reviews WHERE id = ${itemId}`)
    .then((result) => {
      console.log(result);
      cb(null, result);
    });
};

module.exports = {
  insertItem,
  insertReview,
  insertUser,
  insertFoundHelpful,
  getReviewData,
};

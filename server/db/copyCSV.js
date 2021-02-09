const pool = require('./connection.js');

const csvPath = `${__dirname}/csv/`;
const itemCSVpath = `${csvPath}itemSeed.csv`;
const reviewCSVpath = `${csvPath}reviewSeed.csv`;
const userCSVpath = `${csvPath}userSeed.csv`;
const foundHelpfulCSVpath = `${csvPath}foundHelpfulSeed.csv`;

const copyCSV = async () => pool.connect()
  .then((client) => {
    console.log('connected client');
    console.log('starting items copy');
    console.time('Item copy time:');
    return client.query(`
    COPY items(id)
    FROM '${itemCSVpath}'
    DELIMITER ','
    CSV HEADER;
  `)
      .catch((err) => {
        console.log('item copy failed');
        // error cascades to prevent copying next csv file if one fails
        const error = err;
        error.copyFailed = true;
        throw error;
      })
      .then(() => {
        console.timeEnd('Item copy time:');
        console.log('starting users copy');
        console.time('User copy time:');
        return client.query(`
      COPY users(
        id,
        name,
        size,
        height,
        weight,
        age,
        location
      )
      FROM '${userCSVpath}'
      DELIMITER ','
      CSV HEADER;
    `);
      })
      .catch((err) => {
        if (err.copyFailed) {
          throw err;
        }
        console.log('users copy failed');
        throw err;
      })
      .then(() => {
        console.timeEnd('User copy time:');
        console.log('starting reviews copy');
        console.time('Review copy time:');
        return client.query(`
      COPY reviews(
        id,
        item_id,
        user_id,
        date,
        title,
        body,
        stars,
        fit,
        width,
        recommend
      )
      FROM '${reviewCSVpath}'
      DELIMITER ','
      CSV HEADER;
    `);
      })
      .catch((err) => {
        if (err.copyFailed) {
          throw err;
        }
        console.log('reviews copy failed');
        throw err;
      })
      .then(() => {
        console.timeEnd('Review copy time:');
        console.log('starting found_helpful copy');
        console.time('Found_helpful copy time:');
        return client.query(`
      COPY found_helpful(
        id,
        review_id,
        user_id
      )
      FROM '${foundHelpfulCSVpath}'
      DELIMITER ','
      CSV HEADER;
    `);
      })
      .then(() => { console.timeEnd('Found_helpful copy time:'); })
      .catch((err) => {
        if (err.copyFailed) {
          throw err;
        }
        console.log('found_helpful copy failed');
        throw err;
      })
      .catch((err) => {
        console.log(`Error copying CSV at ${err.stack}`);
      })
      .finally(() => {
        client.release();
      });
  });

module.exports = copyCSV;

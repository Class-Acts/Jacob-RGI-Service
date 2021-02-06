const { Pool } = require('pg');

const pool = new Pool({
  user: 'sdc',
  host: 'localhost',
  database: 'reviews',
  password: 'pineapple',
  port: 5432,
  // connectionString: 'postgres://sdc:pineapple@localhost:5432/reviews'
});

// Logging
const logging = true;
pool.on('connect', () => {
  console.log('Connected to pool');
});
const logResult = (resultObj, more) => {
  const anyExtra = more || '';
  if (logging) {
    if (resultObj.rowCount !== null) {
      console.log(`Success: ${resultObj.command} ${resultObj.rowCount} rows. ${anyExtra}`);
    } else if (resultObj.fields !== null) {
      console.log(`Success: ${resultObj.command}. ${anyExtra} ${resultObj.fields}`);
    } else {
      console.log(`Success: ${resultObj.command}. ${anyExtra}`);
    }
  }
};

pool.query(`
    DROP TABLE items, reviews, users, found_helpful;
  `)
  .then((result) => {
    logResult(result);
  })
  .catch(() => { console.error('ERROR DROPPING TABLES, likely don\'t yet exist'); })
  .then(() => pool.query(`
      CREATE TABLE IF NOT EXISTS items (
        id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY
      );
    `))
  .then((result) => {
    logResult(result);
  })
  .catch((err) => { console.error('ERROR CREATING items', err); })
  .then(() => pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name varchar(1000),
        size varchar(50),
        height numeric(2, 0),
        weight numeric(3, 0),
        age numeric(2, 0),
        location varchar(100)
      );
    `))
  .catch((err) => { console.error('ERROR CREATING users', err); })
  .then((result) => {
    logResult(result);
  })
  .then(() => pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        item_id int REFERENCES items (id),
        user_id int REFERENCES users (id),
        date timestamp,
        title text,
        body text,
        stars numeric(1, 0),
        fit numeric(1,0),
        width numeric(1, 0),
        recommend boolean
      );
    `))
  .then((result) => {
    logResult(result);
  })
  .catch((err) => { console.error('ERROR CREATING items', err); })
  .then(() => pool.query(`
    CREATE TABLE IF NOT EXISTS found_helpful (
      id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      review_id int REFERENCES reviews (id),
      user_id int REFERENCES users (id)
      );
    `))
  .then((result) => {
    logResult(result);
  })
  .catch((err) => { console.error('ERROR CREATING found_helpful', err); })
  .then(() => {
    console.log('ending');
    return pool.end();
  })
  .then(() => { console.log('ended'); })
  .catch((err) => { console.error(err); });

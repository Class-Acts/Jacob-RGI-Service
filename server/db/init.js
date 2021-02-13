const { Pool } = require('pg');

const pool = new Pool({
  user: 'ubuntu',
  host: 'ec2-3-141-45-138.us-east-2.compute.amazonaws.com',
  database: 'reviews',
  password: 'ubuntu',
  port: 5432,
});

// Logging
pool.on('connect', () => {
  console.log('created pool for initializing postgres db');
});

(() => {
  pool.query('DROP TABLE IF EXISTS items, users, reviews, found_helpful CASCADE;')
    .catch(() => { console.error('ERROR DROPPING TABLES, likely don\'t yet exist'); })
    .then(() => pool.query(`
      CREATE TABLE IF NOT EXISTS items (
        id serial PRIMARY KEY
      );
    `))
    .catch((err) => { console.error('ERROR CREATING items', err); })
    .then(() => pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        name varchar(1000),
        size varchar(50),
        height numeric(2, 0),
        weight numeric(3, 0),
        age numeric(2, 0),
        location varchar(100)
      );
    `))
    .catch((err) => { console.error('ERROR CREATING users', err); })
    .then(() => pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id serial PRIMARY KEY,
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
    .catch((err) => { console.error('ERROR CREATING items', err); })
    .then(() => pool.query(`
      CREATE TABLE IF NOT EXISTS found_helpful (
        id serial PRIMARY KEY,
        review_id int REFERENCES reviews (id),
        user_id int REFERENCES users (id)
        );
    `))
    .catch((err) => { console.error('ERROR CREATING found_helpful', err); })
    .then(() => pool.query(`
      CREATE INDEX user_id_idx
      ON reviews (user_id);
    `))
    .catch((err) => { console.error('ERROR CREATING user_id_idx on reviews', err); })
    .then(() => pool.query(`
      CREATE INDEX item_id_idx
      ON reviews (item_id);
    `))
    .catch((err) => { console.error('ERROR CREATING item_id_index on reviews', err); })
    .then(() => pool.query(`
      CREATE INDEX review_id_idx
      ON found_helpful (review_id);
    `))
    .catch((err) => { console.error('ERROR CREATING review_id_idx on found_helpful', err); })
    .then(() => {
      console.log('ending pool');
      return pool.end();
    })
    .then(() => { console.log('\n--Finished postgres initialization--\n'); })
    .catch((err) => { console.error(err); });
})();

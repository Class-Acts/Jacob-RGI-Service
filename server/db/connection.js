const { Pool } = require('pg');

const connection = new Pool({
  user: 'sdc',
  host: 'localhost',
  database: 'reviews',
  password: 'pineapple',
  port: 5432,
});

module.exports = connection;

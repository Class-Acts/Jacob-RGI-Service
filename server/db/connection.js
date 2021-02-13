const { Pool } = require('pg');

const connection = new Pool({
  user: 'ubuntu',
  host: 'ec2-3-141-45-138.us-east-2.compute.amazonaws.com',
  database: 'reviews',
  password: 'ubuntu',
  port: 5432,
});

module.exports = connection;

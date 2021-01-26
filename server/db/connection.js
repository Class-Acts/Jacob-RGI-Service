const mysql = require('mysql');
const connectionInfo = require('./connection-info.js');

const connection = mysql.createConnection(connectionInfo);

module.exports = connection;
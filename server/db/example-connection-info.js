const exampleConnectionInfo = {
  user: 'yourusername',
  password: 'yourpassword',
  host: 'localhost'
};

module.exports = exampleConnectionInfo;


//this file is just an example of a connection configuration
//in order to successfully seed the db, please create your own in sq-service/server/db, and be sure to set it to export as 'connectionInfo'
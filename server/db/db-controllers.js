const connection = require('./connection.js');

//Logging functions
const dontLog = () => null;
const logVerbose = () => {

}
const logSpeed = (data, logtype, startTime) {

}
const logSimple = () => {
  console.log('')
}
const log = (options, logtype) => {
  // options argument requires 'result' property received from successful query or 'query' property if making a query attempt
  if
}
const queryLog = (query) => {
  console.log(``);
}
const resultLog = () => {
  console.log(``);
}
const errorLog = () => {
  console.error(``);
}

//Controllers
const insertItem = (data, logging) => {
  let text = `INSERT INTO items DEFAULT VALUES;`
  return connection.query(text);
}
insertReview
const insertReview = (data, logging) => {
  let values = [
    data.item_id,
    data.user_id,
    data.date,
    data.title,
    data.body,
    data.stars,
    data.fit,
    data.width,
    data.recommend
  ]
  let text = `INSERT INTO reviews (
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
  );`
  return connection.query(text, values)
}

const insertUser = (data, logging) => {
  let values = [
    data.item_id,
    data.user_id,
    data.date,
    data.title,
    data.body,
    data.stars,
    data.fit,
    data.width,
    data.recommend
  ]
  let text = `INSERT INTO reviews (
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
  );`
  return connection.query(text, values)
}

const insertFoundHelpful = (data, logging) => {
  let values = [data.item_id, data.user_id];
  let text = `INSERT INTO found_helpful (item_id, user_id) VALUES ($1, $2);`
  return connection.query(text, values);
}


module.exports = {
  insertItem,
  insertReview,
  insertUser,
  insertFoundHelpful,
}
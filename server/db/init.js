var { Pool }= require('pg');
const pool = new Pool({
  user: 'sdc',
  host: 'localhost',
  database: 'reviews',
  password: 'pineapple',
  port: 5432,
  // connectionString: 'postgres://sdc:pineapple@localhost:5432/reviews'
});

//Logging
pool.on('connect', client => {
  console.log(`client connected to pool`)
})
const logResult = (resultObj) => {
  if (resultObj.rowCount !== undefined) {
    console.log(`Success: ${resultObj.command} ${resultObj.rowCount} rows`);
  } else if (resultObj.fields !== undefined) {
    console.log(`Success: ${resultObj.command} ${resultObj.fields}`)
  } else {
    console.log(`Success: ${resultObj.command}`)
  }
}



pool.query(`
    DROP TABLE items, reviews, users, found_helpful;
  `)
  .then((result)=>{
    logResult(result);
  })
  .catch((err)=>{console.error('ERROR DROPPING TABLES',err)})
  .then(()=> {
    return pool.query(`
      CREATE TABLE IF NOT EXISTS items (
        id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY
      );
    `)
  })
  .then((result)=>{
    logResult(result);
  })
  .catch((err)=>{console.error('ERROR CREATING items',err)})
  .then(()=> {
    return pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name varchar(1000),
        size varchar(20),
        height numeric(2, 0),
        weight numeric(2, 0),
        age numeric(2, 0),
        location varchar(100)
      );
    `)
  })
  .catch((err)=>{console.error('ERROR CREATING users',err)})
  .then((result)=>{
    logResult(result);
  })
  .then(()=> {
    return pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        item_id int REFERENCES items (id),
        user_id int REFERENCES users (id),
        date date,
        title text,
        body text,
        stars numeric(1, 0),
        fit numeric(1,0),
        width numeric(1, 0),
        recommend boolean
      );
    `);
  })
  .then((result)=>{
    logResult(result);
  })
  .catch((err)=>{console.error('ERROR CREATING items',err)})
  .then(()=>{
    return pool.query(`
    CREATE TABLE IF NOT EXISTS found_helpful (
      id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      review_id int REFERENCES reviews (id),
      user_id int REFERENCES users (id)
      );
    `);
  })
  .then((result)=>{
    logResult(result);
  })
  .catch((err)=>{console.error('ERROR CREATING found_helpful',err)})
  .then(()=>{
    console.log('ending');
    return pool.end();
  })
  .then(()=>{console.log('ended')})
  .catch((err)=>{console.error(err)});
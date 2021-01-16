const express = require('express');
const app = express();
const PORT = 3000;
const connection = require('./db/seed.js');

app.use(express.static('public'));

app.get('/api/shoes/:shoeId/reviews', (req, res) => {
  connection.query('SELECT * FROM reviews WHERE shoe_id = ' + req.params.shoeId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err).end();
    } else {
      console.log(result);
      res.status(200).send(result).end();
    }
  })
})

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
})
const express = require('express');
const app = express();
const PORT = 3000;
const controllers = require('./db/db-controllers.js');
const cors = require('cors');

app.use(cors());

app.use(express.static('public'));

app.get('/api/shoes/:shoeId/reviews', (req, res) => {
  let item = req.params.shoeId;
  controllers.getReviewData(item, (err, data) => {
    if (err) {
      console.log('GET error', err);
      res.status(400).send(err).end();
    } else {
      console.log('GET success');
      res.status(200).send(data).end();
    }
  })
})

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
})
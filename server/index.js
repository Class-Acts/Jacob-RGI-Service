const express = require('express');
require('newrelic');

const app = express();
const PORT = 3000;
const cors = require('cors');
const controllers = require('./db/db-controllers.js');

app.use(cors());

app.use(express.static('public'));

app.get('/api/shoes/:shoeId/reviews', (req, res) => {
  const item = req.params.shoeId;
  controllers.getReviewData(item)
    .then((reviewData) => {
      res.status(200);
      res.send(reviewData);
    })
    .catch((err) => {
      res.status(404);
      res.send(err);
    });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

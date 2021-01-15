const express = require('express');
const app = express();
const PORT = 4949;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
})
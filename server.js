const express = require('express');
const app = express();


app.use(express.static('public'));
app.use('node_modules', express.static('node_modules'))


app.listen(3000, function () {
  console.log('Server running on port 3000');
})
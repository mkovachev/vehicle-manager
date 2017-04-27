const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

// set MongoDB
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/garage');
const db = mongoose.connection;

// Init App
const app = express();

// set static folders
app.use(express.static('public'));
app.use(express.static('views'));

// set view engine
app.engine('handlebars', exphbs({
  layoutsDir: 'views',
  defaultLayout: 'home'
}));
app.set('view engine', 'handlebars');

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// set routes handlers
const home = require('./routes/homeRouter');
app.use('/', home);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
  console.log('Server started on port ' + app.get('port'));
});
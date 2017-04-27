var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

// set MongoDB
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/garage');
var db = mongoose.connection;

// Init App
var app = express();

// set static folders
app.use(express.static('public'));
app.use(express.static('views'));

// set view engine
app.engine('handlebars', exphbs({
  defaultLayout: 'home'
}));
app.set('view engine', 'handlebars');

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// set routes handlers
var home = require('./routes/homeRouter');
app.use('/', home);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
  console.log('Server started on port ' + app.get('port'));
});
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');



var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/garage');
var db = mongoose.connection;

// set route handler
var routes = require('./routes/homeRouter');
var users = require('./routes/usersRouter');

// Init App
var app = express();

// View Engine
//app.set('views', path.join(__dirname, 'views'));
app.use(express.static('views'));
app.engine('handlebars', exphbs({
  defaultLayout: 'landing'
}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// set static
app.use(express.static('public'));


app.use('/', routes);
app.use('/users', users);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
  console.log('Server started on port ' + app.get('port'));
});
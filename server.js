// BASE SETUP
// =============================================================================
// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var cors = require('cors');

// use it before all route definitions
app.use(cors({ origin: '*' }));
var port = process.env.PORT || 99;        // set our port



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', require('./lib/routes/general.js'));
app.use('/business/', require('./lib/routes/business.js'));
app.use('/profile/', require('./lib/routes/profile.js'));
// START THE SERVER
// =============================================================================
app.listen(port);

console.log('Magic happens on port ' + port);
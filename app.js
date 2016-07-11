"use strict";

var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var config = require('./server/config/database.js');
var fileUpload = require('express-fileupload');
var serviceModel= require('./server/models/consultant-model.js');
var consulController = require('./server/controllers/consult-controller.js');

//Mes routes
var consultantRoute = require('./server/routes/consultantRoute');


var app = express();

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');*/

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 8080; 
//Connection BD
config.connect();

// CONSULTANTS API ROUTES BELOW
app.use('/', consultantRoute);

app.listen(port, function(err){
  if(err){
    console.log('Probleme connexion au port '+port);
    throw err;
  }
  console.log('Application running on port '+port);
});

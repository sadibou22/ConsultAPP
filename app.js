"use strict";

var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var config = require('./server/config/config.js');
var database = require('./server/config/database.js');
var fileUpload = require('express-fileupload');
var ServiveUserModel= require('./server/models/user-model.js');
var consulController = require('./server/controllers/consult-controller.js');
var jwt = require("jsonwebtoken");

//Mes routes
var consultantRoute = require('./server/routes/consultantRoute');


var app = express();



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

/*app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Access-Control-Allow-Origin allowed for all domains.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); //You can send POST and GET requests to this service.
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');//X-Requested-With and content-type headers are allowed.
    next();
});*/


// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 8080; 
//Connection BD
database.connect();
//app.set('superSecret', config.secret); // secret variable


// CONSULTANTS API ROUTES BELOW
app.use('/', consultantRoute);

/*********************PART 2 AUTHENTICATE END AUTORIZE *************/
/*app.get('/setup', function(req, res) {

  // create a sample user
  var nick = new ServiveUserModel.UserModel({ 
    name: 'tra Cerminara', 
    password: 'password',
    admin: true 
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});
// route to return all users (GET http://localhost:8080/api/users)
app.get('/users', function(req, res) {
  ServiveUserModel.UserModel.find({}, function(err, users) {
    res.json(users);
  });
});  

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
app.post('/authenticate', function(req, res) {

  // find the user
  ServiveUserModel.UserModel.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: '1440m' // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
}); 

// route middleware to verify a token
app.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});*/

/*********************PART 2 AUTHENTICATE END AUTORIZE *************************/



app.listen(port, function(err){
  if(err){
    console.log('Probleme connexion au port '+port);
    throw err;
  }
  console.log('Application running on port '+port);
});

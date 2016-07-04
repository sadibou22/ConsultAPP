var express = require('express');
var router = express.Router();
var consulController = require('../controllers/consult-controller.js');


// define the home page route for get
router.get('/', function(req, res) {
  //res.render('index', { title: 'Upload File' });
});



module.exports = router;
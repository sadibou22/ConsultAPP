"use strict";
/*
module.exports = {
  'secret': 'devdacticIsAwesome',
  //'database': 'mongodb://localhost/node-rest-auth'
  'database': 'mongodb://localhost/myapp'
  
};

*/
var mongoose = require('mongoose');
var urlDB = 'mongodb://localhost/myapp';
//connexion   
exports.connect = function() {
    var cb = function(err, res) {
        if (err) {
            console.log('WARNING !****DB erreur connexion****:' + urlDB + '. ' + err);
            res.sendFile("/public/views/err400.html")
        }
        else { console.log('Connexion a la BD '+urlDB+' OK!!'); }
    };
    mongoose.connect(urlDB, cb);
};
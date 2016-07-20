"use strict";
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


//creation de schema d'enregistrement des users 
var userSchema = new Schema ({
	//_id : {type: Number, required:true },
	//Prenom : { type: String },
	//Nom : { type: String },
	name: { type: String },
	password : { type: String },
	admin:  { type: Boolean }

});

//creation de mon model pour les users (ma classe)
exports.UserModel = mongoose.model('User',userSchema);


"use strict";

var express = require('express');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    fs = require('fs'),
    http = require('http');


//creation de schema d'enregistrement des users 
var userSchema = new mongoose.Schema({
	_id : {type: Number, required:true },
	Prenom : { type: String },
	Nom : { type: String },
	Email: { type: String },
	Passeword : { type: String }
});

//creation de mon model pour les users (ma classe)
exports.UserModel = mongoose.model('Users',userSchema);


"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
  
//creation de schema d'enregistrement des consultants a reconfigurer 
var consultantSchema = new mongoose.Schema({
	_id : {type: Number, required:true },
	Prenom : { type: String },
	Nom : { type: String },
	Competences : [],
	Projets : []
});

//creation de mon model pour les consultants(ma classe)
exports.ConsultantModel = mongoose.model('Consultant',consultantSchema);


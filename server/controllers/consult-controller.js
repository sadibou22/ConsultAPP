"use strict";

var fs = require('fs');
var serviceApp = require('../services/servicesApp.js');
var serviceModel= require('../models/consultant-model.js');
var validator = require('validator');

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

//upload fila and save data in MongoDB
exports.uploadFile = function(req, res){
    var sampleFile;

      if (!req.files) {
        res.send('No files were uploaded');
      }
    
      sampleFile = req.files.sampleFile;
        var myPath = sampleFile.name;
      sampleFile.mv(myPath, function(err) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          serviceApp.saveConsultants(myPath); 
          console.log('File uploaded!');
          res.redirect('/');  
        }
      });
}

//all consultants
exports.getAllConsultants = function(req, res) {
    serviceModel.ConsultantModel.find(null)
    .exec(function(err, consultants){
      if(err) {
       handleError(res, err.message, "Failed to get consultants.");
      } else {
        res.status(200).json(consultants);  
      }
    });
};

//get un consultant by id--AFFICHE UN CONSULTANT
exports.getConsultant = function(req, res) {
	var consulId = req.params.id;
      serviceModel.ConsultantModel.findById(consulId, function(err, consultant){
      if(err) {
        handleError(res, err.message, "Failed to get consultant");
      } else if(consultant == null) {
        res.send('Désolé, consultant inexistant'); 
      } else{
          res.status(200).json(consultant); 
      }
    });
};

//put un consultant by id--EDIT UN CONSULTANT
exports.editConsultant = function(req, res) {
	 var consulId = req.params.id;
    serviceModel.ConsultantModel.findById(consulId, function(err, consultant){
        if(err) {
          res.status(500).send('WARNING***quelques chose cloche!');
        } else if(consultant == null) {
          res.status(400).send('Désolé, consultant inexistant');  
        } else{

          consultant.Prenom = req.body.Prenom;
          consultant.Nom = req.body.Nom;
          consultant.Projets = req.body.Projets.toString().split(",");
          consultant.Competences = req.body.Competences.toString().split(",");
          consultant.save();
    
          res.status(204).end();
        }
    });
};

//delete un consultant by id--DELETE UN CONSULTANT
exports.deleteConsultant = function(req, res) {
	console.log(req.params.id);
      var consulId = req.params.id;
          serviceModel.ConsultantModel.findByIdAndRemove(consulId, function(err, consultant){
          if(err) {
            handleError(res, err.message, "Failed to delete consultant");
          } else if(consultant == null) {
            res.send('Désolé, consultant inexistant');  
          } else{
            console.log('Consultant supprimé');
            res.status(204).end();
          }
        });
};
//create un new consultant
exports.createNewConsultant = function(req, res){
	var newConsultant = new serviceModel.ConsultantModel();
	
	if (!(req.body.prenom || req.body.nom)) {
		handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
	}
		
	newConsultant._id =  req.body.id
	newConsultant.Prenom = req.body.prenom;
	newConsultant.Nom = req.body.nom;

	if(!req.body.projet || !req.body.competence){
		newConsultant.Projets = [];
		newConsultant.Competences = [];
	}
	else{
		newConsultant.Projets = req.body.projet.split(",");
		newConsultant.Competences = req.body.competence.split(",");
	}
	//save
	newConsultant.save(function(err) {
		if (err) {
			handleError(res, err.message, "Failed to create new consultant.");
		} else {
			res.status(201).end();
			console.log('saved'); 
			
		}
	});
};

//Methode search 
exports.searchConsultant = function(req, res){
	var choice = req.query.searchChoice;
	
	var champs = req.query.intputSearch;
	
	switch(choice)
	{
		case"competence":getConsultantByCompetences(champs, res );
		break;
		case "id":getConsultantByID(req.query.intputSearch, res);
		break;
		case "nom":getConsultantByNom(req.query.intputSearch, res);
		break;
		case "prenom":getConsultantByPrenom(req.query.intputSearch, res);
		break;
		case "projet":getConsultantByProjet(req.query.intputSearch, res);
		break;
		
	}

}


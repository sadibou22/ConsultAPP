var fs = require('fs');
var csv=require('csv2json-convertor');
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
          saveConsultants(myPath); 
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
	newConsultant.Projets = req.body.projet.split(",");
	newConsultant.Competences = req.body.competence.split(",");

	newConsultant.save(function(err) {
		if (err) {
			handleError(res, err.message, "Failed to create new consultant.");
			console.log('my err:', err.message);
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

//mes methodes
var saveConsultants = function(filname){ 
    //validation fichier avec l'extension
	var valideExt = serviceApp.verifFileExtension(serviceApp.extensionsValides,filname);
	console.log(valideExt);
    if(valideExt){
		//recuperer l'extension du fichier
		var fileExt = serviceApp.getExtension(filname);
		//if(fileExt=="csv"){var data1=csv.csvtojson(filname);} //csvtojson is function that accepts csv filenames and returns JSON object}
		//if(fileExt=='json'){var data1 = ReadJson(filname);}
        switch(fileExt)
        {
            case 'csv': var data=csv.csvtojson(filname);
                //console.log(data1);
                for (var i=0; i< data.length; i++){//debut 
                        saveConsultantCsvInMongo(data,i);
                } 
            break;
            case 'json':
                console.log('json filer..'+JSON.stringify(data[0]));//a traiter au besoin
                //myapp.consultatnt.insert(data);
                /*for (var i=0; i< data.length; i++){
                    saveConsultantTestJson(data, i);
                    } */
            break;
            default:
            //console.log('Desolé, ce format de fichier ne peut pas etre traiter..')
			//res.render('error', {message:'Desolé, ce format de fichier ne peut pas etre traiter..'});
			res.send('Desolé, ce format de fichier ne peut pas etre traiter..');
        }
		
		
		//console.log(data1);

		//console.log(filname);
		//save data in mongo
		//saveInMongo(data1,fileExt);
	}else{
		console.log('Sorry fichier invalide '+ valideExt);
	}
	
	//ensuite delete le file pour ne pas encombré le server 
	fs.unlink(filname, function(err) {
		if (err) {
		return console.error(err);
		}
		console.log("File deleted successfully!");
	});
   
}

//save in mongo
var saveConsultantCsvInMongo = function(data,j){
	//var data = JSON.stringify(d);
	var c = new serviceModel.ConsultantModel({
		
		_id :  data[j].EmpId,
		Prenom : data[j].Prenom,
		Nom : data[j].Nom,
		Competences: [data[j].Competences],
		Projets : [data[j].Projet]
	});
	//c.Competences.push(data[j].Competences);
	//c.Projets.push(data[j].Projet);
	
	serviceModel.ConsultantModel.findById(data[j].EmpId, function(err, consultant){
		if(err) {
			console.log(err);
		} /*else if(consultant == null) {
			//console.log('Désolé, consultant inexistant donc save like insert');
			c.save(function (err) {
			if(err) {console.log(err);throw err;}
			//console.log('saved!!!! yeah');
			});
		} */else{
			//console.log('yes, consultant existe donc save like update');
		 	/*c.update({
		
				//_id :  data[j].EmpId,
				Prenom : data[j].Prenom,
				Nom : data[j].Nom,
				Competences: [data[j].Competences],
				Projets : [data[j].Projet]
				},function (err) {
					if(err) {console.log(err);throw err;}
					//console.log('saved!!!! yeah');
			});*/

			serviceModel.ConsultantModel.update({_id :  data[j].EmpId}, 
												{$set: {Prenom : data[j].Prenom, Nom : data[j].Nom},
												$addToSet: {Competences: data[j].Competences, Projets : data[j].Projet}}, 
												{ multi : true, upsert: true }, function (err, consultant){
				if(err) console.log(err);
			});
		}
	});
	
}
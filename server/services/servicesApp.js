"use strict";

var express = require('express');
var fs = require('fs');
var csv=require('csv2json-convertor');
var serviceModel= require('../models/consultant-model.js');


var extensionsValides=['csv','json'];
//exports.fileExt //stock l'extension du fichier
var getExtension = function(filename)
    {
        var parts = filename.split(".");
        return (parts[(parts.length-1)]);
    }    


    // v�rifie l'extension d'un fichier upload�
    // filename : file a valider
    // listeExt : liste des extensions autoris�es
var verifFileExtension =  function(listeExt, filename){
	//filename = document.getElementById(champ).value.toLowerCase();
	var fileExt = getExtension(filename);
	for (var i=0; i<listeExt.length; i++)
	{
		if ( fileExt == listeExt[i] ) 
		{
			console.log("OK");
			return (true);
		}
	}
	console.log("le fichier doit etre csv ou json");
    //c.render('error', {message:'Desolé, ce format de fichier ne peut pas etre traiter..'});
	return (false);
    
}

//mes methodes
exports.saveConsultants = function(filname){ 
    //validation fichier avec l'extension
	var valideExt = verifFileExtension(extensionsValides,filname);
	console.log(valideExt);
    if(valideExt){
		//recuperer l'extension du fichier
		var fileExt = getExtension(filname);
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
	serviceModel.ConsultantModel.findById(data[j].EmpId, function(err, consultant){
		if(err) {
			throw(err);
		} 
		else{
			serviceModel.ConsultantModel.update({_id :  data[j].EmpId}, 
												{$set: {Prenom : data[j].Prenom, Nom : data[j].Nom},
												$addToSet: {Competences: data[j].Competences, Projets : data[j].Projet}}, 
												{ multi : true, upsert: true }, function (err, consultant){
				if(err) console.log(err);
			});
		}
	});
	
}
 
    

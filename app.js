var express = require('express');
var app = express();
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongooseConnection = require('./models/consultant-model.js');
var fileUpload = require('express-fileupload');
var serviceModel= require('./models/consultant-model.js');
var consulController = require('./controllers/consult-controller.js');

//Mes routes
//var indexRoute = require('./routes/index-route');
//var consultantRoute = require('./routes/consultantRoute');
//var errorRoute = require('./routes/error-route');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
/*



//gestion index et upload
app.use('/', indexRoute);
//gestion consultants
app.use('/', consultantRoute);
//gestion error
app.use('/', errorRoute);




// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});*/

// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
//Connection BD
MongooseConnection.connect();

// CONSULTANTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/consultants"
 *    GET: finds all Consultants
 *    POST: creates a new Consultant
 *    POST: upload file and save
 */
//get
app.get("/consultants", function(req, res) {
    serviceModel.ConsultantModel.find(null)
    .exec(function(err, consultants){
      if(err) {
       handleError(res, err.message, "Failed to get consultants.");
        //console.log(error);
      } else {
        ///res.json(consultants);
        res.status(200).json(consultants);  
        //res.render('consultant', { title: 'Liste des consultants',allConsultants:consultants});
      }
    });
});
//create
app.post("/consultant", function(req, res) {
  var newConsultant = new serviceModel.ConsultantModel({  
    _id :  req.body.__id
    //Prenom : req.body.prenom,
    //Nom : req.body.nom
    //Competences: [data[j].Competences],
    //Projets : [data[j].Projet]
 });
 // newConsultant.Competences.push(req.body.competences);
	//newConsultant.Projets.push(req.body.projet);
  newConsultant._id =  req.body.id
  newConsultant.Prenom = req.body.prenom;
  newConsultant.Nom = req.body.nom;
 //newConsultant = req.body;
  //newConsultant._id = req.body._id
  //newConsultant.createDate = new Date();

  if (!(req.body.prenom || req.body.nom)) {
    handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
  }

  newConsultant.save(function(err) {
    if (err) {
      handleError(res, err.message, "Failed to create new consultant.");
      console.log('my err:', err.message);
    } else {
      res.status(201).end();
      console.log('saved'); 
      //console.log(req.body.projet);
    }
  });
});
//upload file and save to mongoDB
app.post('/upload', function(req, res){
      var sampleFile;

      if (!req.files) {
        res.send('No files were uploaded');
        console.log('No filesss were uploaded.');
        
        //res.render('success', {message:'No files were uploaded'});
        //return;
      }
    
      sampleFile = req.files.sampleFile;
        var myPath = sampleFile.name;
      sampleFile.mv(myPath, function(err) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          consulController.saveConsultants(myPath); 
          //res.status(200).end();
          console.log('File uploaded!');
          res.redirect('#/');
          //res.render('success', {message:'Upload avec success.....'});    
        }
      });
});

/*  "/consultants/:id"
 *    GET: find consultant by id
 *    PUT: update consultant by id
 *    DELETE: deletes consultant by id
 */
//get
app.get("/consultants/:id", function(req, res) {

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
});

  //edit
app.put('/consultants/:id', function(req, res){
    var consulId = req.params.id;
    serviceModel.ConsultantModel.findById(consulId, function(err, consultant){
        if(err) {
          res.status(500).send('WARNING***quelques chose cloche!');
        } else if(consultant == null) {
          res.send('Désolé, consultant inexistant');
          //res.json(consultant);  
        } else{

          consultant.Prenom=req.body.Prenom;
          consultant.Nom=req.body.Nom;
          //mettre pour competence et projet
          consultant.Projets = req.body.Projets.split(",");
          consultant.Competences = req.body.Competences.split(",");
          consultant.save();
    
          res.status(204).end();
          //res.json(consultant); 
          //res.render('edit', { title: 'Mise a jour consultant', unConsultant:consultant});
        }
    });
  //code
});
//delete
app.delete("/consultants/:id", function(req, res) {

      console.log(req.params.id);
      var consulId = req.params.id;
          serviceModel.ConsultantModel.findByIdAndRemove(consulId, function(err, consultant){
          if(err) {
           // res.status(500).send('WARNING***quelques chose cloche!');
            handleError(res, err.message, "Failed to delete consultant");
          } else if(consultant == null) {
            res.send('Désolé, consultant inexistant');
            //res.json(consultant);  
          } else{
            //res.json(consultant); 
            //res.render('delete', { title: 'Consultant Supprimé...', unConsultant:consultant});
            //res.send('Consultant supprimé');
            console.log('Consultant supprimé');
            res.status(204).end();
          }
        });

});

app.listen(port, function(err){
  if(err){
    console.log('Probleme connexion au port '+port);
    throw err;
  }
  console.log('Application running on port '+port);
});

//module.exports = app;
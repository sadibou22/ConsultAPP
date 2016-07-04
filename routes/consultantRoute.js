var express = require('express');
var router = express.Router();
var consulController = require('../controllers/consult-controller.js');
var serviceModel= require('../models/consultant-model.js');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

/*  "/consultants"
 *    GET: finds all Consultants
 *    POST: creates a new Consultant
 */
router.get('/consultants', consulController.getAllConsultants);

router.post('/consultant', consulController.createNewConsultant);

/*  "/upload"
 *    POST: upload file and save in MongoDB
 */
router.post('/upload', consulController.uploadFile);

/*  "/consultants/:id"
 *    GET: find consultant by id
 *    PUT: update consultant by id
 *    DELETE: deletes consultant by id
 */
router.get('/consultants/:id', consulController.getConsultant);

router.put('/consultants/:id', consulController.editConsultant);

router.delete('/consultants/:id', consulController.deleteConsultant);

module.exports = router;

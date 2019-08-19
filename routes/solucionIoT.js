/**
 * REQUIRES
 */
var express = require('express');
var router = express.Router();


var index = require('./solucionIoT/index.js');
var sensores = require('./solucionIoT/sensores.js');
var rootInstance = require('./solucionIoT/rootInstance.js');


/* GET users listing. */
/*
router.get('/', function(req, res, next) {
    res.send("enviando mi respuesta desde el archivo configuraciones.js");
});
*/



/**
 * CALL ROUTES
 */
router.use('/', index);
router.use('/sensores', sensores);
router.use('/rootInstance', rootInstance);




module.exports = router;
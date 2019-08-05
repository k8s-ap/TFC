/**
 * REQUIRES
 */
var express = require('express');
var router = express.Router();


var index = require('./configuraciones/index');
var sensores = require('./configuraciones/sensores.js');


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




module.exports = router;
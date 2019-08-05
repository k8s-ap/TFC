var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    // res.send("Bandydos esta es la ruta de este archivo es: routes/configuraciones/index.js");
    res.render('./pages/configuraciones.ejs');

});

module.exports = router;
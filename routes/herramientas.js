var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.render('./pages/about.ejs');
    res.send("enviando mi respuesta desde el archivo herramientas.js")
});

module.exports = router;
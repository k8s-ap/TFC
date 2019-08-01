var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('./pages/index.ejs');
    // res.send("estoy en li archivo index.js dentro de mi carpeta router");
});

module.exports = router;
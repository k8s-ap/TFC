/**
 * REQUIRES
 */
var express = require('express');
var router = express.Router();

var sensor = require('../../controllers/configuraciones/SensorController.js');


router.get('/', sensor.list);
router.get('/create', sensor.create);
router.post('/save', sensor.save);
router.get('/show', sensor.show);
router.get('/edit/:id', sensor.edit);
router.post('/delete/:id', sensor.delete);
router.post('/update/:id', sensor.update);


module.exports = router;


/**TEORIA
 * 
var express = require('express');
var router = express.Router();

var product = require('../controllers/ProductController.js');

router.get('/', product.list);
router.get('/show/:id', product.show);
router.get('/create', product.create);
router.get('/edit/:id', product.edit);
router.post('/save', product.save);
router.post('/update/:id', product.update); //ruter.post('/tools/controlRemote:id   )
router.post('/delete/:id', product.delete);

module.exports = router;
 */
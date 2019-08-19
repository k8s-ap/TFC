/**
 * REQUIRES
 */
var express = require('express');
var router = express.Router();

var sensor = require('../../controllers/solucionIoT/SensorController.js');


router.get('/', sensor.list);
router.get('/create', sensor.create);
router.post('/save', sensor.save);
router.get('/show/:id', sensor.show);
router.get('/edit/:id', sensor.edit); // cual es la diferencia entre editar y actualizar? la vista?
router.post('/delete/:id', sensor.delete);
router.post('/update/:id', sensor.update);


module.exports = router;
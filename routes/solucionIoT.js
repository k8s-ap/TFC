// REQUIRES
var express = require('express');
var router = express.Router();

var index = require('./solucionIoT/index.js');
var sensores = require('./solucionIoT/sensores.js');
var rootInstance = require('./solucionIoT/rootInstance.js');
var nodoZigbee = require('./solucionIoT/nodoZigbeeRoutes.js');

/**
 * CALL ROUTES
 * Ejemplos de rutas absolutas hasta este endpoint:
 * https://localhost:3000/solucionIoT
 * https://localhost:3000/solucionIoT/sensores
 * https://localhost:3000/solucionIoT/rootInstance
 * https://localhost:3000/solucionIoT/nodoZigbee
 */

router.use('/', index);
router.use('/sensores', sensores);
router.use('/rootInstance', rootInstance);
router.use('/nodoZigbee', nodoZigbee);

module.exports = router;
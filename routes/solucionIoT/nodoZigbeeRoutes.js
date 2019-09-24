// REQUIRES
var express = require('express');
var router = express.Router();
var nodoZigbee = require('../../controllers/solucionIoT/NodoZigbeeController.js');

/* 
NOTA: La ruta URL absoluta es: 
https://localhost:3000/solucionIoT/nodoZigbee
https://localhost:3000/solucionIoT/nodoZigbee/create
https://localhost:3000/solucionIoT/nodoZigbee/show/-LpYw8aWmnbMbKPAm6eE
https://localhost:3000/solucionIoT/nodoZigbee/edit/-LpYw8aWmnbMbKPAm6eE

Los siguientes rutas no muestran vistas, solamente llaman al  metodo correspondiente situado en el controller (para guardar, actualizar o borrar un doc de la BD)
https://localhost:3000/solucionIoT/nodoZigbee/save --> es correlativa de /create
https://localhost:3000/solucionIoT/nodoZigbee/update  --> es correlativa del /show/-Lp....
https://localhost:3000/solucionIoT/nodoZigbee/delete  --> es correlativa del /show/-Lp....
*/

router.get('/', nodoZigbee.list);
router.get('/create', nodoZigbee.create);
router.post('/save', nodoZigbee.save);
router.get('/show/:id', nodoZigbee.show);
router.get('/edit/:id', nodoZigbee.edit);
router.post('/delete/:id', nodoZigbee.delete);
router.post('/update/:id', nodoZigbee.update);

module.exports = router;
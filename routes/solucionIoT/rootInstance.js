/**
 * REQUIRES
 */
var express = require('express');
var router = express.Router();

var rootInstance = require('../../controllers/solucionIoT/RootInstanceController.js');


router.get('/', rootInstance.list);
router.get('/create', rootInstance.create);
router.post('/save', rootInstance.save);
router.get('/show/:id', rootInstance.show);
router.get('/edit/:id', rootInstance.edit);
router.post('/delete/:id', rootInstance.delete);
router.post('/update/:id', rootInstance.update);


module.exports = router;
/**
 * REQUIRES
 */
const express = require('express');
const app = express();
const port = 4100;

var index = require('./routes/index.js');
var herramientas = require('./routes/herramientas.js');
var configuraciones = require('./routes/configuraciones.js');
var usuarios = require('./routes/usuarios.js');
var about = require('./routes/about.js');
//para usar el req.body en SensorController.js
var bodyParser = require('body-parser');

/**
 * SETTING
 */
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs'); //Hay que decirle a node que view engine se va a usar
app.set('views', __dirname + '/views'); // seteamos una variable views que contiene la ruta de los archivos .ejs

// app.use(bodyParser.json()); //esto es lo mismo que hace app.use(express.json());   ???
app.use(bodyParser.urlencoded({ extended: false }));



/**
 * CALL ROUTES
 */
app.use('/', index);
app.use('/configuraciones', configuraciones);
app.use('/herramientas', herramientas);
app.use('/usuarios', usuarios);
app.use('/about', about);






app.listen(port, (req, res) => {
    console.log(`El servidor ha sido inicializado: http://localhost:${port}`);
    console.log(`Listen in port ${port}`);
});

//Esta ruta esta de mas? La puedo borrar sin ocacionar problemas? (averiguar)
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});



/**
 * Manejando errores HTTP 404 para solicitudes de contenido inexistente
 */
app.use(function(req, res, next) {
    let err = new Error('Error pagina no encontrada');
    err.status = 404;
    next(err);
});

/**
 * Manejo de errores, respuestas con codigo HTTP 500, HTTP 404
 *  */
app.use(function(err, req, res, next) {
    // console.log(err);  <<<< es necesario???
    if (err.status === 404)
        res.status(404).json({ message: " ERROR 404: Pagina no encontrada " });
    else
        res.status(500).json({ message: "ERROR 500: Error interno en el servidor!!" });
});
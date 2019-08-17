var Sensor = require("../../models/SensorModel.js");


var sensorController = {};


sensorController.list = function(req, res) {

    let asyncObtenerSensores = async() => {
        let allSensors = await Sensor.findAll();
        // console.log("TODOS LOS SENSORES SON:\n ", allSensors);
        let arraySensores = Object.entries(allSensors);
        console.log(arraySensores);
        console.log("5555555555555555555555555555555555");
        console.log(arraySensores[1]);
        /* let drinks = [{
                name: 'Bloody Mary',
                drunkness: 3
            },
            {
                name: 'Martini',
                drunkness: 5
            },
            {
                name: 'Scotch',
                drunkness: 10
            }
        ]; */
        res.render('./sensor/index.ejs', { sensores: arraySensores });
        /* miArray.forEach(([key, value]) => {
            console.log(key + ' ' + Object.values(value)); // "a 5", "b 7", "c 9"     
        }); */

        // < %= sensores['-LmMYKElQEHWt6GokDwi'].model % >
    };
    asyncObtenerSensores();

    // res.send('aqui tengo que devolver una vista con TODOS los "sensores" en mi BD');

    /* Product.find({}).exec(function (err, products) {
        if (err) { console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render('../views/product/index', { products: products });

    }); */

};

sensorController.create = function(req, res) {
    // res.send('Aqui devuelvo una vista de formulario que me permita crear un sensor');
    // res.render('../views/sensor/create');
    res.render('./sensor/create.ejs');
};

sensorController.save = function(req, res) {
    let sensor = new Sensor(req.body); //creo una nueva instancia de Sensor con los datos del formulario
    sensor.save(); // guardo el sensor creado, en la BD realtimeDatabase {NO se hará segun el tipo: Magnetico, Gas, Movimiento }

    console.log("El key asignado por firebase para mi nuevo sensor es:", sensor.data._id);
    res.redirect("/configuraciones/sensores/show/" + sensor.data._id); // redireccionarlo a la ruta / configuraciones / sensores / show para mostrar los sensores que tengo cargados en mi BD
    // lo unico que faltaria es tratar en caso de error con la conexion a database realtime firebase

};

sensorController.show = function(req, res) {

    var asyncObtenerDetalleUltimoSensorCargado = async() => {
        let sensorShow = await Sensor.findOne(req.params.id); // le envio por parametro la key del ultimo sensor cargado  
        console.log("mostrando el sensor recientemente cargado:\n ", sensorShow);
        res.render('./sensor/show.ejs', { sensor: sensorShow, idSensor: req.params.id });
    }
    asyncObtenerDetalleUltimoSensorCargado(); // llamo a mi funcion asincrona


    // let model = sensorShow.model;
    // let type = sensorShow.type;
    // let lugarUbicacion = sensorShow.lugarUbicacion;
    // res.render('./sensor/show.ejs', { model: "asdddsf" });

};

sensorController.edit = function(req, res) {

    var asyncObtenerDetalleDelSensor = async() => {
        let sensorAEditar = await Sensor.findOne(req.params.id); // le envio por parametro la key del ultimo sensor cargado  
        console.log("SensorAEditar es: \n", sensorAEditar);
        res.render("./sensor/edit.ejs", { sensor: sensorAEditar, idSensor: req.params.id });
    }
    asyncObtenerDetalleDelSensor();



};

sensorController.delete = function(req, res) {
    // res.send("{estoy en delete} Aqui muestro por consola un mensaje que el Sensor fue borrado exitosamente y posteriormente redirecciono al link /Sensors");
    // console.log("estoy en el controoller detele");

    var asyncDeleteSensor = async() => {
        console.log("mi key a borrar detro de Sensor Controoler es:", req.params.id);
        await Sensor.findByIdAndDelete(req.params.id); // le envio en el 1er parametro la key del sensor a actualizar y en el 2do parametro los datos a setear
        console.log("se borro exitosamente???");
        res.redirect("/configuraciones/sensores");
    }
    asyncDeleteSensor();

    // console.log("muestro el mensaje: Sensor borrado exitosamente y posteriormente redirecciono a la direccion /sensors");
    // res.redirect("/configuraciones/sensores");
};

sensorController.update = function(req, res) {

    // console.log("Actualizo los valores del id del sensor.");
    console.log("los datos recibidos para cambiar son:", req.body);
    // res.redirect("/configuraciones/sensores/show/" + req.params.id);

    var asyncActualizoSensor = async() => {
        let set = {
            model: req.body.model,
            type: req.body.type,
            lugarUbicacion: req.body.lugarUbicacion
        };

        await Sensor.findByIdAndUpdate(req.params.id, set); // le envio en el 1er parametro la key del sensor a actualizar y en el 2do parametro los datos a setear

        res.redirect("/configuraciones/sensores/show/" + req.params.id);
    }
    asyncActualizoSensor();

};


module.exports = sensorController;
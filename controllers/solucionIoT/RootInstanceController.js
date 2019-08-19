var RootInstance = require("../../models/RootInstanceModel");


var rootInstanceController = {};


rootInstanceController.list = function(req, res) {
    let asyncObtenerTodos = async() => {
        let allData = await RootInstance.findAll();
        // console.log("TODOS LOS SENSORES SON:\n ", allSensors);
        let arrayData = Object.entries(allData);
        console.log(arrayData);

        console.log(arrayData[1]);

        res.render('./rootInstance/index.ejs', { registros: arrayData });
        /* miArray.forEach(([key, value]) => {
            console.log(key + ' ' + Object.values(value)); // "a 5", "b 7", "c 9"     
        }); */
    };
    asyncObtenerTodos();

    // res.send('aqui tengo que devolver una vista con TODOS los "sensores" en mi BD');

    /* Product.find({}).exec(function (err, products) {
        if (err) { console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render('../views/product/index', { products: products });

    }); */

};

rootInstanceController.create = function(req, res) {
    // res.send('Aqui devuelvo una vista de formulario que me permita crear un sensor');
    // res.render('../views/sensor/create');
    res.render('./rootInstance/create.ejs');
};

rootInstanceController.save = function(req, res) {
    //let solucionIoT = new RootInstance(req.body); //creo una nueva instancia de Sensor con los datos del formulario

    let solucionIoT = new RootInstance(req.body);
    solucionIoT.save(); // guardo el sensor creado, en la BD realtimeDatabase {NO se hará segun el tipo: Magnetico, Gas, Movimiento }

    console.log("El key asignado por firebase para mi nueva solucion IoT es:", solucionIoT.data._id);
    res.redirect("/solucionIoT/rootInstance/show/" + solucionIoT.data._id); // redireccionarlo a la ruta / configuraciones / sensores / show para mostrar los sensores que tengo cargados en mi BD
    // lo unico que faltaria es tratar en caso de error con la conexion a database realtime firebase

};

rootInstanceController.show = function(req, res) {

    var asyncObtenerDetalleUltimoRegistroCargado = async() => {
        let registroShow = await RootInstance.findOne(req.params.id); // le envio por parametro la key del ultimo sensor cargado  
        console.log("mostrando la solucion IOT recientemente cargado:\n ", registroShow);
        res.render('./rootInstance/show.ejs', { registro: registroShow, idRegistro: req.params.id });
    }
    asyncObtenerDetalleUltimoRegistroCargado(); // llamo a mi funcion asincrona


    // let model = sensorShow.model;
    // let type = sensorShow.type;
    // let lugarUbicacion = sensorShow.lugarUbicacion;
    // res.render('./sensor/show.ejs', { model: "asdddsf" });

};

rootInstanceController.edit = function(req, res) {

    var asyncEditarRegistro = async() => {
        let registroAEditar = await RootInstance.findOne(req.params.id); // le envio por parametro la key del ultimo sensor cargado  
        console.log("Registro A Editar es: \n", registroAEditar);
        res.render("./rootInstance/edit.ejs", {
            registro: registroAEditar,
            idRegistro: req.params.id
        });
    }
    asyncEditarRegistro();



};

rootInstanceController.delete = function(req, res) {
    var asyncDelete = async() => {
        console.log("mi key a borrar detro de RootInstance Controoler es:", req.params.id);
        await RootInstance.findByIdAndDelete(req.params.id); // le envio en el 1er parametro la key del sensor a actualizar y en el 2do parametro los datos a setear
        console.log("se borro exitosamente???");
        res.redirect("/solucionIoT/rootInstance");
    }
    asyncDelete();

    // console.log("muestro el mensaje: Sensor borrado exitosamente y posteriormente redirecciono a la direccion /sensors");
    // res.redirect("/configuraciones/sensores");
};

rootInstanceController.update = function(req, res) {

    // console.log("Actualizo los valores del id del sensor.");
    console.log("los datos recibidos para cambiar son:", req.body);
    // res.redirect("/configuraciones/sensores/show/" + req.params.id);

    var asyncActualizo = async() => {
        let set = {
            idHome: "req.body.model",
            idGateway: "req.body.type",
            idNodoZigbee: "req.body.lugarUbicacion",
            idSensor: "data.sensor",
            idMonitoreo: "data.monitoreo",
            idEvent: "data.event",
            idNotification: "data.notification",
            idUser: "data.user",
        };

        await RootInstance.findByIdAndUpdate(req.params.id, set); // le envio en el 1er parametro la key del sensor a actualizar y en el 2do parametro los datos a setear

        res.redirect("/solucionIoT/rootInstance/show/" + req.params.id);
    }
    asyncActualizo();

};


module.exports = rootInstanceController;
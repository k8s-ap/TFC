var RootInstance = require("../../models/RootInstanceModel");

var rootInstanceController = {};

rootInstanceController.list = function(req, res) {
    let asyncObtenerTodos = async() => {
        let allData = await RootInstance.findAll();
        if (allData) {            
            let arrayData = Object.entries(allData);
            console.log("Array de array (con todos mis registros):",arrayData);
            //console.log("Mi segundo registro es:", arrayData[1]);
            res.render('./rootInstance/index.ejs', { registros: arrayData });
        }else{
            res.render('./rootInstance/index.ejs', { registros: null });
        }
        
        /* miArray.forEach(([key, value]) => {
            console.log(key + ' ' + Object.values(value)); // "a 5", "b 7", "c 9"     
        }); */
    };
    asyncObtenerTodos();
};

rootInstanceController.create = function(req, res) {
    //aqui deberia renderizar una unica vista que permita al usuario cargar los datos para:
    //la nueva solutionIoT, los sensores y los nodosZigbee.   
    // res.send('Aqui devuelvo una vista de formulario que me permita crear un documento ');
    // res.render('../views/sensor/create');
    res.render('./rootInstance/create.ejs');
};

rootInstanceController.save = function(req, res) {
    var asyncSave = async() => {
        let solucionIoT = new RootInstance(req.body);
        // console.log("el objeto creado con el constructor de la clase new es:", solucionIoT);
        await solucionIoT.save(); // guardo mi nuevo objeto en la RealtimeDatabase de Firebase
        await console.log("El key asignado por firebase para mi nueva solucion IoT es:", solucionIoT.data._id);
        await res.redirect("/solucionIoT/rootInstance/show/" + solucionIoT.data._id);

        //faltaria tratar el caso de error con la conexion a database realtime firebase(ejemplo desconexion a internet)
    }
    asyncSave();
};

rootInstanceController.show = function(req, res) {
    var asyncMostrarDocumento = async() => {
        console.log("Contenido del req.params.id es:\n ", req.params.id);
        let documento = await RootInstance.findOne(req.params.id); // le envio por parametro la key del documento a mostrar  
        console.log("El documendo a mostrar con el metodo show es:\n ", documento); 
        res.render('./rootInstance/show.ejs', { registro: documento, idRegistro: req.params.id });
    }
    asyncMostrarDocumento(); // llamo a mi funcion asincrona
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
    console.log("JSON recibido en mi metodo update:", req.body);
    var asyncActualizo = async() => {
        /* let set = {
            address: req.body.address,
            apellidoNombre: req.body.apellidoNombre,
            email: req.body.email,
            telef: req.body.telef,
        }; */
        let set = JSON.parse(JSON.stringify(req.body)); //convierto el body en string, luego a JSON y lo asigno a la variable set.(para ahorrarme lineas escribiendo clave y valor para cada propiedad)
        console.log("El  JSON a subir a Firebase es:", set);
        await RootInstance.findByIdAndUpdate(req.params.id, set); // le envio la key del registro a actualizar y  el dato a setear
        res.redirect("/solucionIoT/rootInstance/show/" + req.params.id);
    }
    asyncActualizo();
};


module.exports = rootInstanceController;
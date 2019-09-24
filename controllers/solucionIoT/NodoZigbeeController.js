var NodoZigbee = require("../../models/NodoZigbeeModel");

var nodoZigbeeController = {};

nodoZigbeeController.list = function(req, res) {
    let asyncGetAll = async() => {
        let docs = await NodoZigbee.findAll();
        if (docs) {            
            let arrayData = Object.entries(docs); //convertimos el objeto en un array, para poder recorrerlo en la vista y mostrar cada uno de sus (clave:valor) ¿?
            console.log("Array de array (con todos mis registros): \n", arrayData);
            //console.log("Mi segundo registro es:", arrayData[1]);
            res.render('./nodoZigbee/index.ejs', { registros: arrayData });
        }else{
            res.render('./nodoZigbee/index.ejs', { registros: null });
        }        
        /* miArray.forEach(([key, value]) => {
            console.log(key + ' ' + Object.values(value)); // "a 5", "b 7", "c 9"     
        }); */
    };
    asyncGetAll();
};

nodoZigbeeController.create = function(req, res) {
    //aqui deberia renderizar una unica vista que permita al usuario cargar los datos para:
    //la nueva solutionIoT, los sensores y los nodosZigbee.   
    // res.send('Aqui devuelvo una vista de formulario que me permita crear un documento ');
    // res.render('../views/sensor/create');
    res.render('./nodoZigbee/create.ejs');
};

nodoZigbeeController.save = function(req, res) {
    var asyncSave = async() => {
        let solucionIoT = new NodoZigbee(req.body);
        // console.log("el objeto creado con el constructor de la clase new es:", solucionIoT);
        await solucionIoT.save(); // guardo mi nuevo objeto en la RealtimeDatabase de Firebase
        await console.log("El key asignado por firebase para mi nueva solucion IoT es:", solucionIoT.data._id);
        await res.redirect("/solucionIoT/nodoZigbee/show/" + solucionIoT.data._id);

        //faltaria tratar el caso de error con la conexion a database realtime firebase(ejemplo desconexion a internet)
    }
    asyncSave();
};

nodoZigbeeController.show = function(req, res) {
    var asyncMostrarDocumento = async() => {
        console.log("Contenido del req.params.id es:\n ", req.params.id);
        let documento = await NodoZigbee.findOne(req.params.id); // le envio por parametro la key del documento a mostrar  
        console.log("El documendo a mostrar con el metodo show es:\n ", documento); 
        res.render('./nodoZigbee/show.ejs', { registro: documento, idRegistro: req.params.id });
    }
    asyncMostrarDocumento(); // llamo a mi funcion asincrona
};

nodoZigbeeController.edit = function(req, res) {
    var asyncEditarRegistro = async() => {
        let registroAEditar = await NodoZigbee.findOne(req.params.id); // le envio por parametro la key del ultimo sensor cargado  
        console.log("Registro A Editar es: \n", registroAEditar);
        res.render("./nodoZigbee/edit.ejs", {
            registro: registroAEditar,
            idRegistro: req.params.id
        });
    }
    asyncEditarRegistro();
};

nodoZigbeeController.delete = function(req, res) {
    var asyncDelete = async() => {
        console.log("La key a borrar en la DB es:", req.params.id);
        await NodoZigbee.findByIdAndDelete(req.params.id);  //Hago uso del metodo estatico de la clase NodoZigbee
        console.log("se borro exitosamente???");  // Para verificar eso, debo utilizar un try {} catch(e) {}
        res.redirect("/solucionIoT/nodoZigbee");
    }
    asyncDelete();    
};

nodoZigbeeController.update = function(req, res) {
    console.log("JSON recibido en mi metodo update:", req.body);
    var asyncUpdate = async() => {
        /* let set = {
            address: req.body.address,
            apellidoNombre: req.body.apellidoNombre,
            email: req.body.email,
            telef: req.body.telef,
        }; */
        let set = JSON.parse(JSON.stringify(req.body)); //convierto el body en string, luego a JSON y lo asigno a la variable set.(para ahorrarme lineas escribiendo clave y valor para cada propiedad)
        console.log("El  JSON a subir a RDB es:", set);  // Esto lo borro en el siguiente commit, porque ya me asegure que funciona bien, solo falta utilizar un try{}catch(e){}
        await NodoZigbee.findByIdAndUpdate(req.params.id, set); // le envio la key del registro a actualizar y  el dato a setear
        res.redirect("/solucionIoT/nodoZigbee/show/" + req.params.id);
    }
    asyncUpdate();
};

module.exports = nodoZigbeeController;
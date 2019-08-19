var Database = require("../config/Database.js");
var database = new Database();


class SolutionIoT {
    constructor(data) {
        /* this.data = {
            "idHome": "data.home",
            "idGateway": "data.gateway",
            "idNodoZigbee": "data.nodoZigbee",
            "idSensor": "data.sensor",
            "idMonitoreo": "data.monitoreo",
            "idEvent": "data.event",
            "idNotification": "data.notification",
            "idUser": "data.user",
        }; */
        this.data = {
            "idHome": data.idHome
        };
    }

    get() {
        return this.data;
    }

    save() {
        /**
         * Siempre debo anteponer la variable 'service' antes de cualquier metodo para poder operar con la base de datos.  Ejemplo: database.service.push() para añadir un nuevo par key-value
         * Se recomienda usar.push() para añadir, ya que con este metodo podemos obtener la KEY del registro que acabamos de agregar ¿?
         */
        let ref = database.service.ref('SolutionIoT'); //Referenciamos al nodo SolutionIoT
        let newData = ref.push(this.data); // Pusheamos el nuevo dato
        this.data._id = newData.key; // obtengo el ID del nuevo dato y lo asigno 
        console.log("Se creo y guardo satisfactoriamente con ID:", this.data._id);

    }

    static async findByIdAndUpdate(key, dataSet) {
        await database.service.ref('/SolutionIoT/' + key).update(dataSet);
        // console.log("ya se actualizo supuestamente lo siguiente: ", key, dataSet);
    }

    static async findByIdAndDelete(key) {
        await database.service.ref('/SolutionIoT/' + key).remove();
        console.log("Se borro exitosamente la key:", key);
    }

    static async findOne(key) {
        var allData;
        var result;
        await database.service.ref('/SolutionIoT').once('value').then(snapshot => {
            allData = (snapshot.val());
            // console.log("El ultimo sensor cargado es:\n", key, allData[idRegistro]);
        });
        result = allData[key];
        return result;
    }

    static async findAll() {

        var result;
        await database.service.ref('/SolutionIoT').once('value').then(snapshot => {
            result = (snapshot.val());
        });
        // console.log("mostrar todos los datos: \n", result);
        return result;
    }

}

module.exports = SolutionIoT;
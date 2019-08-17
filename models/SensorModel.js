var Database = require("../config/Database.js");
var database = new Database();


class Sensor {
    constructor(data) {
        this.data = {
            "model": data.model,
            "type": data.type,
            "lugarUbicacion": data.lugarUbicacion
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
        let sensorRef = database.service.ref('Sensor'); //Referenciamos al nodo principal/Sensor
        let newSensorRef = sensorRef.push(this.data); // Pusheamos los datos a la BD
        this.data._id = newSensorRef.key; // obtengo el ID del sensor que acabamos de pushear
        console.log("Se creo satisfactoriamente el sensor, con Key:", this.data._id);

        /**
         * mostramos todos los sensores registrados 
        sensorRef.once('value', snapshot => {
            console.log(snapshot.val());
        });
        */

    }

    static async findByIdAndUpdate(key, dataSet) {
        // await console.log("estoy en el findByIdAndUpdate del archivo SensorModel.js");
        await database.service.ref('/Sensor/' + key).update(dataSet);
        // console.log("ya se actualizo supuestamente lo siguiente: ", key, dataSet);
    }

    static async findByIdAndDelete(keySensor) {
        await database.service.ref('/Sensor/' + keySensor).remove();
        console.log("¿¿borre desde SensorModel.js la key:??", keySensor);
    }

    static async findOne(idRegistro) {
        var todosLosSensores;
        var result;
        await database.service.ref('/Sensor').once('value').then(snapshot => {
            todosLosSensores = (snapshot.val());
            // console.log("El ultimo sensor cargado es:\n", idRegistro, sensoresGuardados[idRegistro]);
        });
        result = todosLosSensores[idRegistro];
        return result;

        // console.log(typeof(sensoresGuardados));
        // let listaTemporal = Object.values(sensoresGuardados);
        // console.log(Object.keys(sensoresGuardados));
        // console.log(Object.getOwnPropertyNames(sensoresGuardados)); //obtiene el nombre de todas las propiedades de dicho objeto
        /**
         * miArray.forEach(([key, value]) => {
             console.log(key + ' ' + Object.values(value)); // "a 5", "b 7", "c 9"     
         });
         */
    }

    static async findAll() {

        var result;
        await database.service.ref('/Sensor').once('value').then(snapshot => {
            result = (snapshot.val());
            // console.log("El ultimo sensor cargado es:\n", idRegistro, sensoresGuardados[idRegistro]);
        });
        // console.log("mostrar todos los sensores: \n", result);
        return result;
    }

}

module.exports = Sensor;
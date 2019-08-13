var Database = require("../config/Database.js");
var database = new Database();


class Sensor {
    constructor(data) {
        this.data = {};
        this.data = data;
        // console.log("Se creo una instancia de la Clase Sensor:", this.data);
    }

    get() {
        return this.data;
    }

    save() {
        /**
         * Siempre debo anteponer la variable 'service' antes de cualquier metodo para poder operar con la base de datos.  Ejemplo: database.service.push() para añadir un nuevo par key-value
         */

        //Se recomienda usar .push() para añadir
        database.service.ref('Sensor').push().set({
            model: this.data.model,
            type: this.data.type,
            lugarUbicacion: this.data.lugarUbicacion
        })
        console.log("Se creo satisfactoriamente el sensor:", this.data);
    }

}

module.exports = Sensor;
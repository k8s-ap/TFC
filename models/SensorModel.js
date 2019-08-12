var Database = require("../config/Database.js");
var database = new Database();


class Sensor {
    /* constructor(data) {
        this.data.model = data.model;
        this.data.type = data.type;
        this.data.lugarUbicacion = data.lugarUbicacion;
    } */
    constructor() {
        // this.data.model = "data.model";
        // this.data.type = "data.type";
        // this.data.lugarUbicacion = "data.lugarUbicacion";
    }

    get() {
        return this.data;
    }
    save() {
        /**
         * Siempre debo anteponer la variable service antes del metodo para operar la base de datos.  Ejemplo: database.service.push() para añadir un nuevo par key-value
         */
        database.service.ref('SensorModel/' + 1551).set({
            model: "miModeloDeSensor"
        });
        console.log("se agrego un elemento a la realtimeDatabase, desde mi archivo sensorModel.js");
    }
}

module.exports = Sensor;

/* var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema); */



/**
 * TEORIA:
 * 
 * El  operador new crea una instancia de un objeto definido por el usuario o uno de los tipos de objetos incorporados que 
 * tienen una función de construcción. El  operador new crea una instancia de un objeto definido por el usuario o uno de los 
 * tipos de objetos incorporados que tienen una función de construcció
 *  */

/* 
function Sensor(data) {
    this.model = data.model;
    this.type = data.type;
    this.lugarUbicacion = data.lugarUbicacion;
} */
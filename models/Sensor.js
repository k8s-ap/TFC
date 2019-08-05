/* function Sensor(model, type, lugarUbicacion) {
    this.model = model;
    this.type = type;
    this.lugarUbicacion = lugarUbicacion;
}
 */

function Sensor(data) {
    this.model = data.model;
    this.type = data.type;
    this.lugarUbicacion = data.lugarUbicacion;
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
 * tienen una función de construccióEl  operador new crea una instancia de un objeto definido por el usuario o uno de los 
 * tipos de objetos incorporados que tienen una función de construcció
 *  */
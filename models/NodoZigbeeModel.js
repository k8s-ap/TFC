var Database = require("../config/Database.js");
var database = new Database();

class NodoZigbee {
    constructor(data) {
        this.data = JSON.parse(JSON.stringify(data));
        // console.log("el dato construido es:", this.data);
    }

    get() {
        return this.data;
    }

    async save() {
    /**
     * Usar database.service.MyMetodo() para poder operar con la base de datos.  Ejemplo: database.service.push() para añadir un nuevo par key-value
     * Se recomienda usar push() para añadir, ya que con este metodo podemos obtener la KEY del registro que acabamos de agregar
     */
        try {
            let ref = await database.service.ref('NodoZigbee');
            // console.log("Lo que pasamos al push CONVERTIDO a JSON es: \n", this.data);
            let newDoc = await ref.push(this.data); // Pusheamos los datos
            this.data._id = await newDoc.key; // obtengo el ID del nuevo documento y lo asigno a una nueva propiedad de mi objeto
            // await console.info("Se guardo el documento en la DB con id:", this.data);    
            await console.info(`Saved successfully in the Realtime Database whit ID: \n ${this.data._id}`);    
        } catch (error) {
            console.error("error al guardar el documento en la base de datos:", error);            
        }
    }

    static async findByIdAndUpdate(key, dataSet) {
        await database.service.ref('/NodoZigbee/' + key).update(dataSet);
        // console.log("ya se actualizo supuestamente lo siguiente: ", key, dataSet);
    }

    static async findByIdAndDelete(key) {
        await database.service.ref('/NodoZigbee/' + key).remove();
        console.log("Se borro exitosamente la key:", key);
    }

    static async findOne(key) {
        var allData;
        var result;
        await database.service.ref('/NodoZigbee').once('value').then(snapshot => {
            allData = (snapshot.val());
            // console.log("El ultimo sensor cargado es:\n", key, allData[idRegistro]);
        });
        result = allData[key];
        return result;
    }

    static async findAll() {
        var result;
        await database.service.ref('/NodoZigbee').once('value').then(snapshot => {
            result = (snapshot.val());
        });
        // console.log("mostrar todos los datos: \n", result);
        return result;
    }
}

module.exports = NodoZigbee;
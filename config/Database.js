/**
 * Requiero la app admin de Firebase que ya fue inicializada en el archivo firebaseBackend-de7e2.js
 */
var admin = require("./firebase.js");

/**
 * Retrieve services via the admin variable...
 * Recupero el servicio RealtimeDatabase por medio de la variable admin (aplicación admin). 
 * Get a reference to the database service
 */
/* var database = admin.database();



function guardarEjemplo() {

    database().ref('GuardarEjemplo/' + 349).set({
        username: "userNameExample",
        email: "emailExample"
    });
} */



class Database {
    constructor() {
        /**
         * La variable service contiene todos los metodos para gestionar a la base de datos, asi que esa variable contiene funciones:
         * ref()
         * set()
         * child()
         * update()
         * push()
         */
        this.service = admin.database();
    }

    get() {
            return this.service;
        }
        /* saveExample() {
            this.service.ref('myReferencia/' + 1505).set({
                username: "usernameExampleService",
                email: "emailExampleService"
            });

            console.log("Creo que los datos se guardaron correctamente");
            console.log(this.service);
        } */
        // save()
}

module.exports = Database;
/**
 * Import Admin SKD
 */
var admin = require("firebase-admin");

/**
 * Fetch the service account key JSON file contents
 */
var serviceAccount = require('./serviceAccountKey.json');

/**
 * Initialize the app with a service account, granting admin privileges
 */

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://backend-de7e2.firebaseio.com'
});

/**
 * TEORIA: 
 *      Una vez que se inicializa el SDK, puedes utilizar los SDK de Firebase Admin para ejecutar las siguientes tareas:
 ** Leer y escribir datos en Realtime Database
 ** Enviar mensajes de Firebase Cloud Messaging
 ** Implementar la autenticación personalizada
 ** Administrar los usuarios de Firebase Authentication 
 */

module.exports = admin;
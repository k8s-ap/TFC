class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar() {
        console.log(`hola soy ${this.nombre} y tengo ${this.edad} años`);
    }
}

module.exports = Persona;
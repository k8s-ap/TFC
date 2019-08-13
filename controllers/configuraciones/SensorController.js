var Sensor = require("../../models/SensorModel.js");


var sensorController = {};


sensorController.list = function(req, res) {

    // res.send('aqui tengo que devolver una vista con la LISTA de sensores en mi BD');
    res.render('./sensor/index.ejs');
    /* Product.find({}).exec(function (err, products) {
        if (err) { console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render('../views/product/index', { products: products });

    }); */

};

sensorController.create = function(req, res) {
    // res.send('Aqui devuelvo una vista de formulario que me permita crear un sensor');
    // res.render('../views/sensor/create');
    res.render('./sensor/create.ejs');
};

sensorController.save = function(req, res) {
    let sensor = new Sensor(req.body); //creo una nueva instancia de Sensor con los datos del formulario
    sensor.save(); // guardo el sensor creado, en la BD realtimeDatabase {NO se hará segun el tipo: Magnetico, Gas, Movimiento }

    res.redirect("/configuraciones/sensores/show"); // redireccionarlo a la ruta / configuraciones / sensores / show para mostrar los sensores que tengo cargados en mi BD
    /* var product = new Product(req.body);

    product.save(function(err) {
        if (err) { console.log('Error: ', err); return; }

        console.log("Successfully created a product. :)");
        res.redirect("/products/show/" + product._id);

    }); */
};

sensorController.show = function(req, res) {
    /* Product.findOne({ _id: req.params.id }).exec(function(err, product) {
        if (err) { console.log('Error: ', err); return; }

        res.render('../views/product/show', { product: product });
    }); */

    res.render('./sensor/show.ejs');

};

sensorController.edit = function(req, res) {
    /* Product.findOne({ _id: req.params.id }).exec(function(err, product) {
        if (err) { console.log("Error:", err); return; }

        res.render("../views/product/edit", { product: product });

    }); */
    console.log("{sensorController.edit}");
    console.log("Busco el id del sensor y lo envio a la vista /views/sensor/edit");
    // res.send("{estoy en edit} Mostrar vista formulario para editar los datos del formulario a editar");
    res.render("./sensor/edit.ejs", { product: 12 });
};

sensorController.delete = function(req, res) {
    // res.send("{estoy en delete} Aqui muestro por consola un mensaje que el Sensor fue borrado exitosamente y posteriormente redirecciono al link /Sensors");

    console.log("muestro el mensaje: Sensor borrado exitosamente y posteriormente redirecciono a la direccion /sensors");
    res.redirect("/configuraciones/sensores");

    /* Product.remove({ _id: req.params.id }, function(err) {
        if (err) { console.log('Error: ', err); return; }

        console.log("Product deleted!");
        res.redirect("/products");
    }); */

};

sensorController.update = function(req, res) {
    // res.send('{estoy en update} Actualizo id del sensor y actualizo.  Finalmente redirecciono a /configuraciones/sensores/show/2018');
    console.log("{estoy en update} Actualizo id del sensor y actualizo.  Finalmente redirecciono a /configuraciones/sensores/show/2018");
    res.redirect("/configuraciones/sensores/show");
    /* Product.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                price: req.body.price
            }
        }, { new: true },
        function(err, product) {
            if (err) {
                console.log('Error: ', err);
                res.render('../views/product/edit', { product: req.body });
            }

            console.log(product);

            res.redirect('/products/show/' + product._id);

        }); */
};


module.exports = sensorController;
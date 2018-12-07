//Import modules
const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const db         = require('./config/db_config');

//Import Routes
const carrerasRoutes = require('./routes/CarreraRoutes');
const materiaRoutes = require('./routes/MateriaRoutes');
const alumnoRoutes = require('./routes/AlumnoRoutes');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
//parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//define route to carrera
app.use('/api/carrera', carrerasRoutes);
app.use('/api/materia', materiaRoutes);
app.use('/api/alumno', alumnoRoutes);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
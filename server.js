//Import modules
const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const db         = require('./config/db_config');

//Import Controllers
const carrerasRoutes = require('./routes/carreraRoutes');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
//parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//define route to carrera
app.use('/carrera', carrerasRoutes);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
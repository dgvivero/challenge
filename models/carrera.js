//Carrera Model
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CarreraSchema = new Schema({
    nombre          : String,
    titulo          : String
});

module.exports = mongoose.model('Carrera', CarreraSchema );
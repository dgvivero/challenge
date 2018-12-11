//Carrera Model
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CarreraSchema = new Schema({
    nombre          : {type:String, required: true, unique: true},
    titulo          : String
});

module.exports = mongoose.model('Carrera', CarreraSchema );
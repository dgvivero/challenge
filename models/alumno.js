//Alumno model
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const AlumnoSchema = new Schema({
    nombre   : {type: String, required: true},
    fecha    : Date,
	direccion  : {
        calle  : String,
        ciudad : String,
        prov   : String,
        cpostal: Number
    },
	carrera  : { type: Schema.Types.ObjectId, ref: 'Carrera', required: true },
	materias :[{type: Schema.Types.ObjectId, ref: "MateriaCursada"}]
});

//Export function to create "Alumno" model class
module.exports = mongoose.model('Alumno', AlumnoSchema );
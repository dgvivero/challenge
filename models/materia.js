//Materia model
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const MateriaSchema = new Schema({
    nombre          : String, 
    cargaHoraria    : { type: Number, min: 1, required: true },
	carreras        :[{type: Schema.Types.ObjectId, ref: "Carrera"}]
});

module.exports = mongoose.model('Materia', MateriaSchema );
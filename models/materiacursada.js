//MateriaCursada model
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const MateriaCursadaSchema = new Schema({
    materia      :{type: Schema.Types.ObjectId, ref: "Materia"},
	cursada      :Boolean, 
	nota         :Number
});


module.exports = mongoose.model('MateriaCursada', MateriaCursadaSchema );
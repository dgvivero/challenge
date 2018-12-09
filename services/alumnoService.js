/*
* Service Layer
* for alumnos
*/

//Models
const Alumno = require('../models/alumno');

exports.findAlumnoById = (id)=>{
   
 return Alumno.findById(id)
	   .populate("carrera")
	   .populate("materias")
	   .exec()
};
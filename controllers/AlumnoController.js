/*
* Controller class for Alumno
*
*
*/
const Alumno        = require('../models/alumno');
const Cursada       = require('../models/materiacursada');


//GET'S
// Display list of all Materia but materias have only id
exports.findAll = (req, res) => {
	res.send({
	   message: "Not implemented"
	})
};

// Display one Alumno by id and pupulate materias to with materiacursada data
exports.findOne = (req, res) => {
	res.send({
	   message: "Not implemented"
	})
};

//POST
// Create one Alumno
exports.create = (req, res) =>{
	res.send({
	   message: "Not implemented"
	})
};


//PUT
//Update one Alumno by id
exports.update = (req, res)=> {
	res.send({
	   message: "Not implemented"
	})
};


//DELETE 
//Delete one Alumno by id
exports.delete = (req, res) => {
	res.send({
	   message: "Not implemented"
	})
	
};
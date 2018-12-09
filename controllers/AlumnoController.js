/*
* Controller class for Alumno
*
*
*/

//Models
const Alumno        = require('../models/alumno');
const Carrera       = require('../models/carrera');
const Cursada       = require('../models/materiacursada');

//Services
const AlumnoService = require('../services/alumnoService');


//GET'S
// Display list of all Materia but materias have only id
exports.findAll = (req, res) => {
	Alumno.find()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving alumnos."
        });
    });
};

// Display one Alumno by id and pupulate materias to with materiacursada data
exports.findOne = (req, res) => {
	
	AlumnoService.findAlumnoById(req.params.alumnoId)
    .then(alumno => {
        res.json(alumno);
    })
	.catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "alumno not found with id " + req.params.alumnoId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving alumno with id " + req.params.alumnoId
        });
    });
};

//POST
// Create one Alumno
exports.create = (req, res) =>{
	// Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Alumno content can not be"
        });
    }

    
    const alumno = new Alumno({
        nombre   : req.body.nombre,
        fecha    : req.body.fecha,
		direccion  : {
			calle  : req.body.direccion.calle|| 'calle', 
			ciudad : req.body.direccion.ciudad || 'ciudad',
			prov   : req.body.direccion.prov || 'prov',
			cpostal: req.body.direccion.cpostal || 0,
		},
		carrera  : req.body.carrera
    });
	
	// Save alumno in the database
    alumno.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the alumno."
        });
    });
};

//POST
//Add materia to alumno collection
exports.addMateria = (req, res) =>{
	// Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "materia content can not be"
        });
    }
	
	Alumno.findById(req.params.alumnoId)
    .then(alumno => {
        if(!alumno) {
            return res.status(404).send({
                message: "alumno not found with id " + req.params.alumnoId
            });            
        }
        res.json(alumno);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "alumno not found with id " + req.params.alumnoId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving alumno with id " + req.params.alumnoId
        });
    });

    
    const alumno = new Alumno({
        nombre   : req.body.nombre,
        fecha    : req.body.fecha,
		direccion  : {
			calle  : req.body.direccion.calle|| 'calle', 
			ciudad : req.body.direccion.ciudad || 'ciudad',
			prov   : req.body.direccion.prov || 'prov',
			cpostal: req.body.direccion.cpostal || 0,
		},
		carrera  : req.body.carrera
    });
	
	// Save alumno in the database
    alumno.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the alumno."
        });
    });
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
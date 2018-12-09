/*
* Controller class for Alumno
*
*
*/

//Models
const Alumno          = require('../models/alumno');
const Carrera         = require('../models/carrera');
const MateriaCursada  = require('../models/materiacursada');


//GET'S
// Display list of all Materia but materias have only id
exports.findAll = (req, res) => {
	Alumno.find()
	.populate("carrera")
	.populate("materias")
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
	
	Alumno.findById(req.params.alumnoId)
	.populate("carrera")
	.populate("materias")
    .then(alumno => {
		if(!alumno) 
		   return res.status(404).send({
                      message: "alumno not found with id " + req.params.alumnoId
            });
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

//PUT
//Update one Alumno by id
exports.update = (req, res)=> {
	// Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "content can not be empty"
        });
    }
	if(typeof req.body.materias !== 'undefined') 
		return res.status(500).send({message: "Don't use alumno to update materias"});
	
	Alumno.findByIdAndUpdate(req.params.alumnoId, 
	                         req.body, {new: true})
	.then(alumno => {
        if(!alumno) {
            return res.status(404).send({
                message: "alumno not found with id " + req.params.alumnoId
            });
        }
        res.json(alumno)
	})
	.catch(err => {
        return res.status(500).send({message: err.message});
    });
};


//DELETE 
//Delete one Alumno by id
exports.delete = (req, res) => {
	
	Alumno.findByIdAndRemove(req.params.alumnoId)
	.then(alumno => {
        if(!alumno) {
            return res.status(404).send({
                message: "alumno not found with id " + req.params.alumnoId
            });
        }
        res.send({message: "alumno deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "alumno not found with id " + req.params.alumnoId
            });                
        }
        return res.status(500).send({
            message: "Could not delete alumno with id " + req.params.alumnoId
        });
    });
	
};


//POST
//Add materia to alumno collection
exports.addMateria = (req, res) =>{
	// Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "content can not be empty"
        });
    }
	Alumno.findById(req.params.alumnoId)
	.populate("materias")
    .then(alumno => {
	  if (typeof alumno.materias !== 'undefined' && alumno.materias.length > 0) {
		 //
		 alumno.materias.forEach(cursada=>{
			 if( cursada.materia == req.body.materia) 
				 throw new Error('Alumno has this materia');
		 })
	  }else {
		  
	    var cursada = new MateriaCursada({
		     materia      :req.body.materia,
	         cursada      :req.body.cursada, 
	         nota         :req.body.nota
		});
		cursada.save()
	    alumno.materias.push(cursada);
		alumno.save()
		res.json(alumno);
	  }		  
    })
	.catch(err => {
        return res.status(500).send({message: err.message});
    });
    
};

//PUT
//Update materia cursada 
exports.updateMateria = (req, res)=> {
	// Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "content can not be empty"
        });
    }
	
	if(!req.body.cursada) 
		return res.status(400).send({
            message: "Cursada must be true to update nota"
        });
	//materia cursada need to exist in alumno
	
	Alumno.findById(req.params.alumnoId)
	.populate("materias")
    .then(alumno => {
	  if (typeof alumno.materias !== 'undefined' && alumno.materias.length > 0) 
		 var cursada = alumno.materias.find(cursada => cursada.materia == req.body.materia);
      
	  if(typeof cursada == 'undefined')
		  throw new Error('materia not exit for this alumno');
 
	  
	})
	.catch(err => {
        return res.status(500).send({message: err.message});
    });
	
	MateriaCursada.findByIdAndUpdate(req.params.materiaId, req.body, {new: true})
	.then().catch(err => {
        return res.status(500).send({message: err.message});
    });
	
	Alumno.findById(req.params.alumnoId)
	.populate("materias")
    .then(alumno => {
	      res.json(alumno)
	}).catch(err => {
        return res.status(500).send({message: err.message});
    });;
};


//DELETE 
//Delete one Alumno by id
exports.removeMateria = (req, res) => {
	
	Alumno.findById(req.params.alumnoId)
	.then(alumno => {
		alumno.materias.pull(req.params.materiaId);
		alumno.update()
		.catch(err => {
          return res.status(500).send({
            message: err.message
          })
		})
	})
	.catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "alumno not found with id " + req.params.alumnoId
            });                
        }
        return res.status(500).send({
            message: err.message 
        });
    });
	
	
	MateriaCursada.findByIdAndDelete(req.params.materiaId)
    .then(materia => {
        if(!materia) {
            return res.status(404).send({
                message: "materia not found with id " + req.params.materiaId
            });
        }
        res.send({message: "materia deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "materia not found with id " + req.params.materiaId
            });                
        }
        return res.status(500).send({
            message: "Could not delete materia with id " + req.params.materiaId
        });
    });
	
};
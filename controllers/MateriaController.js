/*
* Controller class for Materia
*
*
*/
const Materia        = require('../models/materia');



//GET'S
// Display list of all Materia but materias have only id
exports.findAll = (req, res) => {
	Materia.find()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving materias."
        });
    });
};

// Display one Materia by id and pupulate materias to with materia data
exports.findOne = (req, res) => {
	Materia
	.findById(req.params.materiaId)
	.populate('materias') 
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Materia not found with id " + req.params.materiaId
            });            
        }
        res.json(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Materia not found with id " + req.params.materiaId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving materia with id " + req.params.materiaId
        });
    });
};

//POST
// Create one Materia
exports.create = (req, res) =>{
	// Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Materia content can not be empty"
        });
    }

    
    const materia = new Materia({
        nombre: req.body.nombre || "Nombre Materia", 
        cargaHoraria: req.body.cargaHoraria || 0,
		carreras:req.body.carreras || []
		
    });
	
	// Save materia in the database
    materia.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Materia."
        });
    });
};

//PUT
//Update one Materia by id
exports.update = (req, res)=> {
	 // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "materia content can not be empty"
        } );
    }

    // Find and update it with the request body
    Materia.findByIdAndUpdate(req.params.materiaId, {
        nombre: req.body.nombre, 
        cargaHoraria: req.body.cargaHoraria,
		carreras:req.body.carreras
    }, {new: true})
    .then(materia => {
        if(!materia) {
            return res.status(404).send({
                message: "materia not found with id " + req.params.materiaId
            });
        }
        res.json(materia);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "materia not found with id " + req.params.materiaId
            });                
        }
        return res.status(500).send({
            message: "Error updating materia with id " + req.params.materiaId
        });
    });
};


//DELETE 
//Delete one Materia by id
exports.delete = (req, res) => {
	Materia.findByIdAndDelete(req.params.materiaId)
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
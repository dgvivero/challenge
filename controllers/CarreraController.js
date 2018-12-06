const Carrera        = require('../models/carrera');
const Materia        = require('../models/materia');


// Display list of all Carreras.
exports.findAll = (req, res) => {
	
	Carrera.find()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving carreras."
        });
    });
    
};


exports.findOne = (req, res) => {
   Carrera.findById(req.params.carreraId)
    .then(carrera => {
        if(!carrera) {
            return res.status(404).send({
                message: "Carrera not found with id " + req.params.carreraId
            });            
        }
        res.json(carrera);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Carrera not found with id " + req.params.carreraId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving carrera with id " + req.params.carreraId
        });
    });
};

// Create a Carrera
exports.create = (req, res) =>{
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    
    const carrera = new Carrera({
        nombre: req.body.nombre || "Nombre Carrera", 
        titulo: req.body.titulo || "Titulo Carrera",
		
    });
	
	// Save carrera in the database
    carrera.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Carrera."
        });
    });

};


exports.update = (req, res)=> {
    res.send('NOT IMPLEMENTED:  create POST');
};


exports.delete = (req, res) => {
    Carrera.findByIdAndRemove(req.params.carreraId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Carrera not found with id " + req.params.carreraId
            });
        }
        res.send({message: "Carrera deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Carrera not found with id " + req.params.carreraId
            });                
        }
        return res.status(500).send({
            message: "Could not delete carrera with id " + req.params.carreraId
        });
    });
};


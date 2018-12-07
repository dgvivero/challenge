const Carrera        = require('../models/carrera');


// Display list of all Carreras.
exports.findAll = (req, res) => {
	
	Carrera.find()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving carreras  ."
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
    if(!req.body) {
        return res.status(400).send({
            message: "Carrera content can not be"
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
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Carrera content can not be empty"
        } );
    }

    // Find and update it with the request body
    Carrera.findByIdAndUpdate(req.params.carreraId, {
        nombre: req.body.nombre,
        titulo: req.body.titulo
    }, {new: true})
    .then(carrera => {
        if(!carrera) {
            return res.status(404).send({
                message: "carrera not found with id " + req.params.carreraId
            });
        }
        res.json(carrera);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "carrera not found with id " + req.params.carreraId
            });                
        }
        return res.status(500).send({
            message: "Error updating carrera with id " + req.params.carreraId
        });
    });
};


exports.delete = (req, res) => {
    Carrera.findByIdAndDelete(req.params.carreraId)
    .then(carrera => {
        if(!carrera) {
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


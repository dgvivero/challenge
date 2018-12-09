const express = require('express');
const router = express.Router();

// Require controller modules.
const alumnoCtrl = require('../controllers/AlumnoController');

/// CARRERA ROUTES ///
    router.get('/', alumnoCtrl.findAll);
    router.get('/:alumnoId', alumnoCtrl.findOne);
	router.post('/', alumnoCtrl.create);
	router.post('/:alumnoId/materia', alumnoCtrl.addMateria);
    router.put('/:alumnoId', alumnoCtrl.update);
	router.put('/:alumnoId/materia/:materiaId', alumnoCtrl.updateMateria);
    router.delete('/:alumnoId', alumnoCtrl.delete);
	router.delete('/:alumnoId/materia/:materiaId', alumnoCtrl.removeMateria);

module.exports = router;
const express = require('express');
const router = express.Router();

// Require controller modules.
const alumnoCtrl = require('../controllers/AlumnoController');

/// CARRERA ROUTES ///
    router.get('/', alumnoCtrl.findAll);
    router.get('/:alumnoId', alumnoCtrl.findOne);
	router.post('/', alumnoCtrl.create);
    router.put('/:alumnoId', alumnoCtrl.update);
    router.delete('/:alumnoId', alumnoCtrl.delete);

module.exports = router;
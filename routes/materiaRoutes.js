const express = require('express');
const router = express.Router();

// Require controller modules.
const materiaCtrl = require('../controllers/MateriaController');

/// CARRERA ROUTES ///
    router.post('/', materiaCtrl.create);
    router.get('/', materiaCtrl.findAll);
    router.get('/:materiaId', materiaCtrl.findOne);
    router.put('/:materiaId', materiaCtrl.update);
    router.delete('/:materiaId', materiaCtrl.delete);

module.exports = router;
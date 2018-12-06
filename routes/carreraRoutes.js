const express = require('express');
const router = express.Router();

// Require controller modules.
const carreraCtrl = require('../controllers/CarreraController');

/// CARRERA ROUTES ///
    router.post('/', carreraCtrl.create);
    router.get('/', carreraCtrl.findAll);
    router.get('/:carreraId', carreraCtrl.findOne);
    router.put('/:carreraId', carreraCtrl.update);
    router.delete('/:carreraId', carreraCtrl.delete);

module.exports = router;
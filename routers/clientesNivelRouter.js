const express = require('express');
const router = express.Router();
const nivelClienteController = require('../controllers/nivelClienteController');


router.get('/:id', nivelClienteController.verNivelCliente);


module.exports = router;
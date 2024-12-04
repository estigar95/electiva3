const express = require('express');
const router = express.Router();
const integracionController = require('../controllers/integracionController');

// Endpoint para enviar datos al CRM o ERP
router.post('/enviar', integracionController.enviarDatos);

// Endpoint para recibir datos del CRM o ERP
router.post('/recibir', integracionController.recibirDatos);

module.exports = router;

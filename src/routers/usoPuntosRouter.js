// routes/usoPuntosRoutes.js

const express = require('express');
const router = express.Router();
const usoPuntosController = require('../controllers/usoPuntosController');

// Obtener uso de puntos por concepto de uso
router.get('/concepto/:conceptoUso', usoPuntosController.getUsoPuntosByConcepto);

// Obtener uso de puntos por fecha de uso
router.get('/fecha/:fechaUso', usoPuntosController.getUsoPuntosByFecha);

// Obtener uso de puntos por cliente
router.get('/cliente/:clienteId', usoPuntosController.getUsoPuntosByCliente);

module.exports = router;
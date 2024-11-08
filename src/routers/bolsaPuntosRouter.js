
const express = require('express');
const router = express.Router();
const bolsaPuntosController = require('../controllers/bolsaPuntosController');

// Obtener bolsas de puntos por cliente
router.get('/cliente/:clienteId', bolsaPuntosController.getBolsasPuntosByCliente);

// Obtener bolsas de puntos por rango de puntos
router.get('/rango', bolsaPuntosController.getBolsasPuntosByRango);

// Ruta para cargar puntos
router.post('/cargar-puntos', bolsaPuntosController.cargarPuntos);

module.exports = router;

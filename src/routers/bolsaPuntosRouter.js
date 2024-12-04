
const express = require('express');
const router = express.Router();
const bolsaPuntosController = require('../controllers/bolsaPuntosController');

// Obtener bolsas de puntos por cliente
router.get('/cliente/:clienteId', bolsaPuntosController.getBolsasPuntosByCliente);

// Obtener bolsas de puntos por rango de puntos
router.get('/rango', bolsaPuntosController.getBolsasPuntosByRango);

// Ruta para cargar puntos
router.post('/cargar-puntos', bolsaPuntosController.cargarPuntos);

// Utilizar puntos (POST)
router.post('/canjear_puntos', bolsaPuntosController.canjear_puntos);

// Consultar puntos equivalentes a un monto X (GET)
router.get('/puntos_por_monto', bolsaPuntosController.getPuntosPorMonto);

module.exports = router;

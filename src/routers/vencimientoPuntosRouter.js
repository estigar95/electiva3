
const express = require('express');
const router = express.Router();
const vencimientoPuntosController = require('../controllers/vencimientoPuntosController');

// Obtener todos los vencimientos de puntos
router.get('/', vencimientoPuntosController.getVencimientosPuntos);

// Obtener un vencimiento de puntos por ID
router.get('/:id', vencimientoPuntosController.getVencimientoPuntosById);

// Crear un nuevo vencimiento de puntos
router.post('/', vencimientoPuntosController.createVencimientoPuntos);

// Actualizar un vencimiento de puntos existente
router.put('/:id', vencimientoPuntosController.updateVencimientoPuntos);

// Eliminar un vencimiento de puntos
router.delete('/:id', vencimientoPuntosController.deleteVencimientoPuntos);

module.exports = router;

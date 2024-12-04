
const express = require('express');
const router = express.Router();
const vencimientoPuntosController = require('../controllers/vencimientoPuntosController');

// Crear un nuevo vencimiento de puntos
router.post('/', vencimientoPuntosController.createVencimientoPuntos);


// Obtener todos los vencimientos de puntos
router.get('/', vencimientoPuntosController.getVencimientosPuntos);

// Obtener un vencimiento de puntos por ID
router.get('/:id', vencimientoPuntosController.getVencimientoPuntosById);


// Actualizar un vencimiento de puntos existente
router.put('/:id', vencimientoPuntosController.updateVencimientoPuntos);

// Eliminar un vencimiento de puntos
router.delete('/:id', vencimientoPuntosController.deleteVencimientoPuntos);

module.exports = router;

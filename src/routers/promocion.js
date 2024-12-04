const express = require('express');
const router = express.Router();

const promocionController = require('../controllers/promocionController');

// Crear una nueva promoción
router.post('/promociones', promocionController.crearPromocion);

// Obtener todas las promociones
router.get('/promociones', promocionController.obtenerPromociones);

// Actualizar una promoción existente
router.put('/promociones/:id', promocionController.actualizarPromocion);

// Eliminar una promoción
router.delete('/promociones/:id', promocionController.eliminarPromocion);

// Ruta para asignar puntos considerando promociones
router.post('/asignar-puntos-promo', promocionController.asignarPuntosConPromocion);

module.exports = router;
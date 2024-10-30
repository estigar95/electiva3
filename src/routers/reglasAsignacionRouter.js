const express = require('express');
const router = express.Router();
const reglasAsignacionController = require('../controllers/reglasAsignacionController');

// Rutas para reglas de asignación de puntos
router.post('/', reglasAsignacionController.createRegla); // Crear regla
router.get('/', reglasAsignacionController.getReglas); // Obtener todas las reglas
router.put('/:id', reglasAsignacionController.updateRegla); // Actualizar regla
router.delete('/:id', reglasAsignacionController.deleteRegla); // Eliminar regla

module.exports = router;

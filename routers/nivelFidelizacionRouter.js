const express = require('express');
const router = express.Router();
const nivelFidelizacionController = require('../controllers/nivelFidelizacionController');


router.post('/', nivelFidelizacionController.crearNivelFidelizacion);
router.get('/', nivelFidelizacionController.obtenerNivelesFidelizacion);
router.get('/:id', nivelFidelizacionController.obtenerNivelFidelizacion);
router.put('/:id', nivelFidelizacionController.actualizarNivelFidelizacion);
router.delete('/:id', nivelFidelizacionController.eliminarNivelFidelizacion);

module.exports = router;
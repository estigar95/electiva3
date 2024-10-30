// routes/conceptoUsoRouter.js

const express = require('express');
const router = express.Router();
const conceptoUsoController = require('../controllers/conceptoUsoController');

// Rutas para los conceptos de uso
router.post('/', conceptoUsoController.crearConceptoUso);
router.get('/', conceptoUsoController.obtenerConceptosUso);
router.get('/:id', conceptoUsoController.obtenerConceptoUsoPorId);
router.put('/:id', conceptoUsoController.actualizarConceptoUso);
router.delete('/:id', conceptoUsoController.eliminarConceptoUso);

module.exports = router;

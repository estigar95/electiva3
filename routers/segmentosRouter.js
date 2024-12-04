const express = require('express');
const router = express.Router();
const segmentoController = require('../controllers/segmentosController');


router.post('/', segmentoController.crearSegmento);
router.get('/', segmentoController.obtenerSegmentos);
router.get('/:id', segmentoController.obtenerSegmento);
router.put('/:id', segmentoController.actualizarSegmento);
router.delete('/:id', segmentoController.eliminarSegmento);

module.exports = router;
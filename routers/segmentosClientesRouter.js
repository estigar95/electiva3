const express = require('express');
const router = express.Router();
const segmentoClienteController = require('../controllers/segmentosClientesController');


router.post('/', segmentoClienteController.crearSegmentoCliente);
/*router.get('/', segmentoClienteController.obtenerSegmentos);
router.get('/:id', segmentoClienteController.obtenerSegmento);
router.put('/:id', segmentoClienteController.actualizarSegmento);
router.delete('/:id', segmentoClienteController.eliminarSegmento);*/

module.exports = router;
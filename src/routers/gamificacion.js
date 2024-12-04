const express = require('express');
const router = express.Router();

const gamificacionController = require('../controllers/gamificacionController');

// Obtener desafíos activos
router.get('/desafios', gamificacionController.obtenerDesafios);

// Crear un nuevo desafío
router.post('/desafios', gamificacionController.crearDesafio);

// Actualizar un desafío existente
router.put('/desafios/:id', gamificacionController.actualizarDesafio);

// Eliminar un desafío
router.delete('/desafios/:id', gamificacionController.eliminarDesafio);


// Obtener insignias del cliente
router.get('/clientes/:cliente_id/insignias', gamificacionController.obtenerInsignias);

// Crear una nueva insignia
router.post('/insignias', gamificacionController.crearInsignia);

// Actualizar una insignia existente
router.put('/insignias/:id', gamificacionController.actualizarInsignia);

// Eliminar una insignia
router.delete('/insignias/:id', gamificacionController.eliminarInsignia);

// Ruta para asignar una insignia a un cliente
router.post('/cliente-insignias', gamificacionController.asignarInsigniaACliente);

module.exports = router;

const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Obtener clientes por nombre (aproximación)
router.get('/buscar_por_nombre/', clienteController.getClientesPorNombre);

// Obtener clientes por apellido (aproximación)
router.get('/buscar_por_apellido', clienteController.getClientesPorApellido);

// Obtener clientes por cumpleaños
router.get('/cumple', clienteController.getClientesPorCumpleaños);

// Obtener clientes con puntos a vencer en x días
router.get('/puntos_por_vencer/:dias', clienteController.getClientesConPuntosPorVencer);


router.post('/', clienteController.crearCliente);
router.get('/', clienteController.obtenerClientes);
router.get('/id/:id', clienteController.obtenerCliente);
router.put('/:id', clienteController.actualizarCliente);
router.delete('/:id', clienteController.eliminarCliente);


module.exports = router;

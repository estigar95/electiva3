const pool = require('../config/config'); // Importa el pool de conexión

// Crear Cliente
exports.crearCliente = async (req, res) => {
    const { nombre, 
            apellido, 
            numero_documento, 
            tipo_documento, 
            nacionalidad, 
            email, 
            telefono, 
            fecha_nacimiento } = req.body;
    try {
        const resultado = await pool.query(
            'INSERT INTO cliente (nombre, apellido, numero_documento, tipo_documento, nacionalidad, email, telefono, fecha_nacimiento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [nombre, apellido, numero_documento, tipo_documento, nacionalidad, email, telefono, fecha_nacimiento]
        );
          res.status(201).json({ message: 'Cliente registrado correctamente' });
        //res.status(201).json(resultado.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener todos los Clientes
exports.obtenerClientes = async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM cliente');
        res.status(200).json(resultado.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener un Cliente
exports.obtenerCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('SELECT * FROM cliente WHERE id = $1', [id]);
        res.status(200).json(resultado.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar Cliente
exports.actualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { nombre, 
            apellido, 
            numero_documento, 
            tipo_documento, 
            nacionalidad, 
            email, 
            telefono, 
            fecha_nacimiento 
          } = req.body;
    try {
        const resultado = await pool.query(
            'UPDATE cliente SET nombre = $1, apellido = $2, numero_documento = $3, tipo_documento = $4, nacionalidad = $5, email = $6, telefono = $7, fecha_nacimiento = $8 WHERE id = $9 RETURNING *',
            [nombre, apellido, numero_documento, tipo_documento, nacionalidad, email, telefono, fecha_nacimiento, id]
        );
        res.status(200).json(resultado.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar Cliente
exports.eliminarCliente = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM cliente WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const pool = require("../config/config");

// Crear Cliente
exports.crearCliente = async (req, res) => {
    const { nombre, apellido, numero_documento, tipo_documento, nacionalidad, email, telefono, fecha_nacimiento } = req.body;
    try {
        const resultado = await pool.query(
            'INSERT INTO cliente (nombre, apellido, numero_documento, tipo_documento, nacionalidad, email, telefono, fecha_nacimiento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [nombre, apellido, numero_documento, tipo_documento, nacionalidad, email, telefono, fecha_nacimiento]
        );
        res.status(201).json(resultado.rows[0]);
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
    const { nombre, apellido, numero_documento, tipo_documento, nacionalidad, email, telefono, fecha_nacimiento } = req.body;
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

// Obtener clientes con puntos a vencer en x días
exports.getClientesConPuntosPorVencer = async (req, res) => {
    const dias = parseInt(req.params.dias);
  
    if (isNaN(dias) || dias < 0) {
      return res.status(400).json({ error: 'El parámetro "dias" debe ser un número entero positivo.' });
    }
  
    try {
      const query = `
        SELECT DISTINCT
          c.id AS cliente_id,
          c.nombre,
          c.apellido,
          bp.fecha_caducidad,
          bp.saldo_puntos
        FROM
          cliente c
        INNER JOIN
          bolsa_puntos bp ON c.id = bp.cliente_id
        WHERE
          bp.fecha_caducidad BETWEEN CURRENT_DATE AND CURRENT_DATE + $1 * INTERVAL '1 day'
          AND bp.saldo_puntos > 0
        ORDER BY
          bp.fecha_caducidad ASC;
      `;
  
      const values = [dias];
      const result = await pool.query(query, values);
  
      res.status(200).json(result.rows);
    } catch (err) {
      console.error('Error al obtener clientes con puntos por vencer:', err);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  };


// Obtener clientes por nombre (aproximación)
exports.getClientesPorNombre = async (req, res) => {
    const nombre = req.query.nombre;
  
    if (!nombre) {
      return res.status(400).json({ error: 'El parámetro "nombre" es requerido.' });
    }
  
    try {
      const query = `
        SELECT
          id AS cliente_id,
          nombre,
          apellido,
          fecha_nacimiento,
          email,
          telefono
        FROM
          cliente
        WHERE
          nombre ILIKE '%' || $1 || '%'
        ORDER BY
          apellido, nombre;
      `;
  
      const values = [nombre];
      const result = await pool.query(query, values);
  
      res.status(200).json(result.rows);
    } catch (err) {
      console.error('Error al obtener clientes por nombre:', err);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  };
  
  // Obtener clientes por apellido (aproximación)
  exports.getClientesPorApellido = async (req, res) => {
    const apellido = req.query.apellido;
  
    if (!apellido) {
      return res.status(400).json({ error: 'El parámetro "apellido" es requerido.' });
    }
  
    try {
      const query = `
        SELECT
          id AS cliente_id,
          nombre,
          apellido,
          fecha_nacimiento,
          email,
          telefono
        FROM
          cliente
        WHERE
          apellido ILIKE '%' || $1 || '%'
        ORDER BY
          apellido, nombre;
      `;
  
      const values = [apellido];
      const result = await pool.query(query, values);
  
      res.status(200).json(result.rows);
    } catch (err) {
      console.error('Error al obtener clientes por apellido:', err);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  };
  
  // Obtener clientes por cumpleaños
  exports.getClientesPorCumpleaños = async (req, res) => {
    const dia = parseInt(req.query.dia);
    const mes = parseInt(req.query.mes);
  
    if (isNaN(dia) || isNaN(mes)) {
      return res.status(400).json({ error: 'Los parámetros "dia" y "mes" son requeridos y deben ser números.' });
    }
  
    try {
      const query = `
        SELECT
          id AS cliente_id,
          nombre,
          apellido,
          fecha_nacimiento,
          email,
          telefono
        FROM
          cliente
        WHERE
          EXTRACT(DAY FROM fecha_nacimiento) = $1 AND EXTRACT(MONTH FROM fecha_nacimiento) = $2
        ORDER BY
          apellido, nombre;
      `;
  
      const values = [dia, mes];
      const result = await pool.query(query, values);
  
      res.status(200).json(result.rows);
    } catch (err) {
      console.error('Error al obtener clientes por cumpleaños:', err);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  };
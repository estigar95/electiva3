const moment = require('moment');
const pool = require("../config/config");

// Obtener lista de desafíos activos
const obtenerDesafios = async (req, res) => {
  try {
    const today = moment().format('YYYY-MM-DD');
    const result = await pool.query(
      `SELECT * FROM desafio
       WHERE fecha_inicio <= $1 AND fecha_fin >= $1`,
      [today]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener desafíos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


// Crear un nuevo desafío
const crearDesafio = async (req, res) => {
    try {
      const {
        nombre,
        descripcion,
        fecha_inicio,
        fecha_fin,
        puntos_requeridos,
        puntos_recompensa,
      } = req.body;
  
      // Validar que los campos requeridos estén presentes
      if (!nombre || !fecha_inicio || !fecha_fin || !puntos_requeridos || !puntos_recompensa) {
        return res.status(400).json({ error: 'Todos los campos requeridos deben estar presentes' });
      }
  
      const result = await pool.query(
        `INSERT INTO desafio (nombre, descripcion, fecha_inicio, fecha_fin, puntos_requeridos, puntos_recompensa)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [nombre, descripcion, fecha_inicio, fecha_fin, puntos_requeridos, puntos_recompensa]
      );
  
      res.status(201).json({ message: 'Desafío creado exitosamente', desafio: result.rows[0] });
    } catch (error) {
      console.error('Error al crear desafío:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  // Actualizar un desafío existente
  const actualizarDesafio = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        nombre,
        descripcion,
        fecha_inicio,
        fecha_fin,
        puntos_requeridos,
        puntos_recompensa,
      } = req.body;
  
      // Verificar si el desafío existe
      const desafioResult = await pool.query('SELECT * FROM desafio WHERE id = $1', [id]);
      if (desafioResult.rows.length === 0) {
        return res.status(404).json({ error: 'Desafío no encontrado' });
      }
  
      // Actualizar el desafío
      const result = await pool.query(
        `UPDATE desafio
         SET nombre = $1,
             descripcion = $2,
             fecha_inicio = $3,
             fecha_fin = $4,
             puntos_requeridos = $5,
             puntos_recompensa = $6
         WHERE id = $7
         RETURNING *`,
        [nombre, descripcion, fecha_inicio, fecha_fin, puntos_requeridos, puntos_recompensa, id]
      );
  
      res.status(200).json({ message: 'Desafío actualizado exitosamente', desafio: result.rows[0] });
    } catch (error) {
      console.error('Error al actualizar desafío:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  // Eliminar un desafío
  const eliminarDesafio = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Verificar si el desafío existe
      const desafioResult = await pool.query('SELECT * FROM desafio WHERE id = $1', [id]);
      if (desafioResult.rows.length === 0) {
        return res.status(404).json({ error: 'Desafío no encontrado' });
      }
  
      // Eliminar el desafío
      await pool.query('DELETE FROM desafio WHERE id = $1', [id]);
  
      res.status(200).json({ message: 'Desafío eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar desafío:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };


// Obtener insignias del cliente
const obtenerInsignias = async (req, res) => {
  try {
    const { cliente_id } = req.params;

    if (!cliente_id) {
      return res.status(400).json({ error: 'cliente_id es requerido' });
    }

    const result = await pool.query(
      `SELECT i.*
       FROM cliente_insignia ci
       JOIN insignia i ON ci.insignia_id = i.id
       WHERE ci.cliente_id = $1`,
      [cliente_id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener insignias:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


// Crear una nueva insignia
const crearInsignia = async (req, res) => {
    try {
      const { nombre, descripcion } = req.body;
  
      // Validar que el campo nombre esté presente
      if (!nombre) {
        return res.status(400).json({ error: 'El nombre de la insignia es requerido' });
      }
  
      const result = await pool.query(
        `INSERT INTO insignia (nombre, descripcion)
         VALUES ($1, $2)
         RETURNING *`,
        [nombre, descripcion]
      );
  
      res.status(201).json({ message: 'Insignia creada exitosamente', insignia: result.rows[0] });
    } catch (error) {
      console.error('Error al crear insignia:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  // Actualizar una insignia existente
  const actualizarInsignia = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;
  
      // Verificar si la insignia existe
      const insigniaResult = await pool.query('SELECT * FROM insignia WHERE id = $1', [id]);
      if (insigniaResult.rows.length === 0) {
        return res.status(404).json({ error: 'Insignia no encontrada' });
      }
  
      // Actualizar la insignia
      const result = await pool.query(
        `UPDATE insignia
         SET nombre = $1,
             descripcion = $2,
         WHERE id = $3
         RETURNING *`,
        [nombre, descripcion, id]
      );
  
      res.status(200).json({ message: 'Insignia actualizada exitosamente', insignia: result.rows[0] });
    } catch (error) {
      console.error('Error al actualizar insignia:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  // Eliminar una insignia
  const eliminarInsignia = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Verificar si la insignia existe
      const insigniaResult = await pool.query('SELECT * FROM insignia WHERE id = $1', [id]);
      if (insigniaResult.rows.length === 0) {
        return res.status(404).json({ error: 'Insignia no encontrada' });
      }
  
      // Eliminar la insignia
      await pool.query('DELETE FROM insignia WHERE id = $1', [id]);
  
      res.status(200).json({ message: 'Insignia eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar insignia:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

// Insertar un nuevo registro en cliente_insignia
const asignarInsigniaACliente = async (req, res) => {
    try {
      const { cliente_id, insignia_id } = req.body;
  
      // Validar que los campos requeridos estén presentes
      if (!cliente_id || !insignia_id) {
        return res.status(400).json({ error: 'cliente_id e insignia_id son requeridos' });
      }
  
      // Verificar si el cliente existe
      const clienteResult = await pool.query('SELECT * FROM cliente WHERE id = $1', [cliente_id]);
      if (clienteResult.rows.length === 0) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
  
      // Verificar si la insignia existe
      const insigniaResult = await pool.query('SELECT * FROM insignia WHERE id = $1', [insignia_id]);
      if (insigniaResult.rows.length === 0) {
        return res.status(404).json({ error: 'Insignia no encontrada' });
      }
  
      // Verificar si el cliente ya tiene asignada esa insignia
      const existeResult = await pool.query(
        'SELECT * FROM cliente_insignia WHERE cliente_id = $1 AND insignia_id = $2',
        [cliente_id, insignia_id]
      );
      if (existeResult.rows.length > 0) {
        return res.status(400).json({ error: 'El cliente ya tiene asignada esta insignia' });
      }
  
      // Insertar el nuevo registro en cliente_insignia
      const fecha_obtenida = moment().format('YYYY-MM-DD');
  
      const insertResult = await pool.query(
        `INSERT INTO cliente_insignia (cliente_id, insignia_id, fecha_obtenida)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [cliente_id, insignia_id, fecha_obtenida]
      );
  
      res.status(201).json({
        message: 'Insignia asignada al cliente exitosamente',
        cliente_insignia: insertResult.rows[0],
      });
    } catch (error) {
      console.error('Error al asignar insignia al cliente:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

module.exports = {
  crearDesafio,
  actualizarDesafio,
  eliminarDesafio,
  obtenerDesafios,
  obtenerInsignias,
  crearInsignia,
  actualizarInsignia,
  eliminarInsignia,
  asignarInsigniaACliente,
};

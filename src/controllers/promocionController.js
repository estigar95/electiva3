const pool = require("../config/config");
const moment = require('moment');

// Crear una nueva promoción
const crearPromocion = async (req, res) => {
    try {
      const { nombre, descripcion, fecha_inicio, fecha_fin, factor_bonificacion, productos_aplicables } = req.body;
  
      if (!nombre || !fecha_inicio || !fecha_fin || !factor_bonificacion) {
        return res.status(400).json({ error: 'Los campos nombre, fecha_inicio, fecha_fin y factor_bonificacion son obligatorios.' });
      }
  
      const result = await pool.query(
        `INSERT INTO promocion (nombre, descripcion, fecha_inicio, fecha_fin, factor_bonificacion, productos_aplicables)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [nombre, descripcion, fecha_inicio, fecha_fin, factor_bonificacion, productos_aplicables]
      );
  
      res.status(201).json({ message: 'Promoción creada exitosamente', promocion: result.rows[0] });
    } catch (error) {
      console.error('Error al crear la promoción:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  // Obtener todas las promociones
  const obtenerPromociones = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM promocion');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error al obtener promociones:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  // Actualizar una promoción
  const actualizarPromocion = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion, fecha_inicio, fecha_fin, factor_bonificacion, productos_aplicables } = req.body;
  
      // Verificar si la promoción existe
      const promocionResult = await pool.query('SELECT * FROM promocion WHERE id = $1', [id]);
      if (promocionResult.rows.length === 0) {
        return res.status(404).json({ error: 'Promoción no encontrada.' });
      }
  
      const result = await pool.query(
        `UPDATE promocion
         SET nombre = $1,
             descripcion = $2,
             fecha_inicio = $3,
             fecha_fin = $4,
             factor_bonificacion = $5,
             productos_aplicables = $6
         WHERE id = $7
         RETURNING *`,
        [nombre, descripcion, fecha_inicio, fecha_fin, factor_bonificacion, productos_aplicables, id]
      );
  
      res.status(200).json({ message: 'Promoción actualizada exitosamente', promocion: result.rows[0] });
    } catch (error) {
      console.error('Error al actualizar la promoción:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  // Eliminar una promoción
  const eliminarPromocion = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Verificar si la promoción existe
      const promocionResult = await pool.query('SELECT * FROM promocion WHERE id = $1', [id]);
      if (promocionResult.rows.length === 0) {
        return res.status(404).json({ error: 'Promoción no encontrada.' });
      }
  
      await pool.query('DELETE FROM promocion WHERE id = $1', [id]);
  
      res.status(200).json({ message: 'Promoción eliminada exitosamente.' });
    } catch (error) {
      console.error('Error al eliminar la promoción:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  const asignarPuntosConPromocion = async (req, res) => {
    try {
      const { cliente_id, monto_compra, producto_id } = req.body;
  
      if (!cliente_id || !monto_compra) {
        return res.status(400).json({ error: 'cliente_id y monto_compra son requeridos' });
      }
  
      // Verificar si el cliente existe
      const clienteResult = await pool.query('SELECT * FROM cliente WHERE id = $1', [cliente_id]);
      if (clienteResult.rows.length === 0) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
  
      const fechaActual = moment().format('YYYY-MM-DD');
  
      // Obtener la regla de asignación de puntos aplicable
      let reglaResult = await pool.query(
        `SELECT * FROM regla_asignacion
         WHERE ($1 BETWEEN limite_inferior AND limite_superior)
            OR (limite_inferior IS NULL AND limite_superior IS NULL)
         ORDER BY limite_inferior DESC
         LIMIT 1`,
        [monto_compra]
      );
  
      if (reglaResult.rows.length === 0) {
        return res.status(400).json({ error: 'No se encontró una regla de asignación aplicable' });
      }
      const regla = reglaResult.rows[0];
  
      // Calcular los puntos base a asignar
      const puntosBase = Math.floor(monto_compra / regla.monto_equivalencia);
  
      if (puntosBase <= 0) {
        return res.status(200).json({ message: 'Monto insuficiente para asignar puntos' });
      }
  
      // Verificar si hay promociones activas
      const promocionesResult = await pool.query(
        `SELECT * FROM promocion
         WHERE fecha_inicio <= $1 AND fecha_fin >= $1`,
        [fechaActual]
      );
  
      let factorBonificacion = 1; // Por defecto, sin bonificación
  
      if (promocionesResult.rows.length > 0) {
        for (const promo of promocionesResult.rows) {
          let aplicaPromocion = false;
  
          // Si la promoción aplica a productos específicos
          if (promo.productos_aplicables && producto_id) {
            const productos = promo.productos_aplicables.split(',').map(id => id.trim());
            if (productos.includes(producto_id.toString())) {
              aplicaPromocion = true;
            }
          } else {
            // La promoción aplica a todos los productos
            aplicaPromocion = true;
          }
  
          if (aplicaPromocion) {
            factorBonificacion *= parseFloat(promo.factor_bonificacion);
          }
        }
      }
  
      // Calcular los puntos totales a asignar con bonificación
      const puntosAsignados = Math.floor(puntosBase * factorBonificacion);
  
      // Obtener la parametrización de vencimiento de puntos vigente
      const vencimientoResult = await pool.query(
        `SELECT * FROM vencimiento_puntos
         WHERE fecha_inicio <= $1 AND fecha_fin >= $1
         LIMIT 1`,
        [fechaActual]
      );
      let fechaCaducidad = null;
      if (vencimientoResult.rows.length > 0) {
        const vencimiento = vencimientoResult.rows[0];
        fechaCaducidad = moment(fechaActual).add(vencimiento.dias_duracion, 'days').format('YYYY-MM-DD');
      }
  
      // Iniciar una transacción
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
  
        // Registrar la nueva bolsa de puntos
        await client.query(
          `INSERT INTO bolsa_puntos (cliente_id, fecha_asignacion, fecha_caducidad, puntaje_asignado, puntaje_utilizado, saldo_puntos, monto_operacion)
           VALUES ($1, $2, $3, $4, 0, $4, $5)`,
          [cliente_id, fechaActual, fechaCaducidad, puntosAsignados, monto_compra]
        );
  
        await client.query('COMMIT');
  
        res.status(200).json({
          message: 'Puntos asignados correctamente al cliente',
          puntosAsignados,
          factorBonificacion,
        });
      } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error al asignar puntos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error al procesar la asignación de puntos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  
  module.exports = {
    crearPromocion,
    obtenerPromociones,
    actualizarPromocion,
    eliminarPromocion,
    asignarPuntosConPromocion,
  };
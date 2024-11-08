const pool = require("../config/config");

// Obtener bolsas de puntos por cliente
exports.getBolsasPuntosByCliente = async (req, res) => {
  const clienteId = parseInt(req.params.clienteId);

  try {
    const query = `
      SELECT
        bp.id AS bolsa_id,
        bp.fecha_asignacion,
        bp.fecha_caducidad,
        bp.puntaje_asignado,
        bp.puntaje_utilizado,
        bp.saldo_puntos,
        bp.monto_operacion,
        c.id AS cliente_id,
        c.nombre,
        c.apellido
      FROM
        bolsa_puntos bp
      INNER JOIN
        cliente c ON bp.cliente_id = c.id
      WHERE
        c.id = $1
      ORDER BY
        bp.fecha_asignacion DESC;
    `;

    const values = [clienteId];
    const result = await pool.query(query, values);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener bolsas de puntos por rango de puntos
exports.getBolsasPuntosByRango = async (req, res) => {
  const puntosMinimos = parseInt(req.query.puntosMinimos);
  const puntosMaximos = parseInt(req.query.puntosMaximos);

  try {
    const query = `
      SELECT
        bp.id AS bolsa_id,
        bp.fecha_asignacion,
        bp.fecha_caducidad,
        bp.puntaje_asignado,
        bp.puntaje_utilizado,
        bp.saldo_puntos,
        bp.monto_operacion,
        c.id AS cliente_id,
        c.nombre,
        c.apellido
      FROM
        bolsa_puntos bp
      INNER JOIN
        cliente c ON bp.cliente_id = c.id
      WHERE
        bp.saldo_puntos BETWEEN $1 AND $2
      ORDER BY
        bp.fecha_asignacion DESC;
    `;

    const values = [puntosMinimos, puntosMaximos];
    const result = await pool.query(query, values);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//cargar puntos en la bolsa
exports.cargarPuntos = async (req, res) => {
  const { cliente_id, monto_operacion } = req.body;

  try {
    // Validar que los parámetros necesarios estén presentes
    if (!cliente_id || !monto_operacion) {
      return res.status(400).json({ error: 'cliente_id y monto_operacion son requeridos.' });
    }

    // Verificar que el cliente exista
    const clienteResult = await pool.query('SELECT * FROM cliente WHERE id = $1', [cliente_id]);
    if (clienteResult.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado.' });
    }

    // Obtener la regla de asignación de puntos aplicable
    let reglaQuery = `
      SELECT *
      FROM regla_asignacion
      WHERE ($1 BETWEEN limite_inferior AND limite_superior)
      ORDER BY id ASC
      LIMIT 1
    `;
    const reglaValues = [monto_operacion];
    let reglaResult = await pool.query(reglaQuery, reglaValues);

    // Si no se encontró una regla específica, buscar una regla general (limites nulos)
    if (reglaResult.rows.length === 0) {
      reglaQuery = `
        SELECT *
        FROM regla_asignacion
        WHERE limite_inferior IS NULL AND limite_superior IS NULL
        LIMIT 1
      `;

      reglaResult = await pool.query(reglaQuery);
      if (reglaResult.rows.length === 0) {
        return res.status(400).json({ error: 'No se encontró una regla de asignación de puntos aplicable.' });
      }
    }

    const regla = reglaResult.rows[0];
    const montoEquivalencia = regla.monto_equivalencia;

    // Calcular el puntaje asignado
    const puntajeAsignado = Math.round(monto_operacion / montoEquivalencia);

    if (puntajeAsignado <= 0) {
      return res.status(400).json({ error: 'El monto de operación no genera puntos según las reglas establecidas.' });
    }

    // Obtener los parámetros de vencimiento de puntos
    const vencimientoResult = await pool.query(`
      SELECT *
      FROM vencimiento_puntos
      WHERE fecha_inicio <= CURRENT_DATE AND fecha_fin >= CURRENT_DATE
      LIMIT 1
    `);

    let diasDuracion = 365; // Valor por defecto de 1 año
    if (vencimientoResult.rows.length > 0) {
      diasDuracion = vencimientoResult.rows[0].dias_duracion;
    }

    // Calcular la fecha de caducidad
    const fechaAsignacion = new Date();
    const fechaCaducidad = new Date();
    fechaCaducidad.setDate(fechaCaducidad.getDate() + diasDuracion);

    // Insertar en la tabla bolsa_puntos
    const insertQuery = `
      INSERT INTO bolsa_puntos (
        cliente_id,
        fecha_asignacion,
        fecha_caducidad,
        puntaje_asignado,
        puntaje_utilizado,
        saldo_puntos,
        monto_operacion
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
    `;
    const insertValues = [
      cliente_id,
      fechaAsignacion,
      fechaCaducidad,
      puntajeAsignado,
      0, // puntaje_utilizado inicial
      puntajeAsignado, // saldo_puntos inicial
      monto_operacion,
    ];

    const insertResult = await pool.query(insertQuery, insertValues);

    res.status(201).json({
      message: 'Puntos cargados exitosamente.',
      bolsa_puntos: insertResult.rows[0],
    });
  } catch (err) {
    console.error('Error al cargar puntos:', err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};
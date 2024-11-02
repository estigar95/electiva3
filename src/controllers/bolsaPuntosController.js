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

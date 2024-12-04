const pool = require("../config/config");

// Obtener uso de puntos por concepto de uso
exports.getUsoPuntosByConcepto = async (req, res) => {
  const conceptoUso = req.params.conceptoUso;

  try {
    const query = `
      SELECT
        upc.id AS uso_id,
        upc.fecha AS fecha_uso,
        c.id AS cliente_id,
        c.nombre,
        c.apellido,
        cu.id AS concepto_id,
        cu.descripcion AS concepto_uso,
        upc.puntaje_utilizado
      FROM
        uso_puntos_cabecera upc
      INNER JOIN
        cliente c ON upc.cliente_id = c.id
      INNER JOIN
        concepto_uso cu ON upc.concepto_id = cu.id
      WHERE
        cu.descripcion ILIKE '%' || $1 || '%'
      ORDER BY
        upc.fecha DESC;
    `;

    const values = [conceptoUso];
    const result = await pool.query(query, values);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener uso de puntos por fecha de uso
exports.getUsoPuntosByFecha = async (req, res) => {
  const fechaUso = req.params.fechaUso;

  try {
    const query = `
      SELECT
        upc.id AS uso_id,
        upc.fecha AS fecha_uso,
        c.id AS cliente_id,
        c.nombre,
        c.apellido,
        cu.id AS concepto_id,
        cu.descripcion AS concepto_uso,
        upc.puntaje_utilizado
      FROM
        uso_puntos_cabecera upc
      INNER JOIN
        cliente c ON upc.cliente_id = c.id
      INNER JOIN
        concepto_uso cu ON upc.concepto_id = cu.id
      WHERE
        upc.fecha = $1
      ORDER BY
        upc.fecha DESC;
    `;

    const values = [fechaUso];
    const result = await pool.query(query, values);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener uso de puntos por cliente
exports.getUsoPuntosByCliente = async (req, res) => {
  const clienteId = parseInt(req.params.clienteId);

  try {
    const query = `
      SELECT
        upc.id AS uso_id,
        upc.fecha AS fecha_uso,
        c.id AS cliente_id,
        c.nombre,
        c.apellido,
        cu.id AS concepto_id,
        cu.descripcion AS concepto_uso,
        upc.puntaje_utilizado
      FROM
        uso_puntos_cabecera upc
      INNER JOIN
        cliente c ON upc.cliente_id = c.id
      INNER JOIN
        concepto_uso cu ON upc.concepto_id = cu.id
      WHERE
        c.id = $1
      ORDER BY
        upc.fecha DESC;
    `;

    const values = [clienteId];
    const result = await pool.query(query, values);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

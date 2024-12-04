const pool = require("../config/config");

// Función para obtener el monto total de un cliente
const obtenerMontoTotal = async (cliente_id) => {
  try {
    const result = await pool.query(`
      SELECT SUM(monto_operacion) AS monto_total
      FROM bolsa_puntos
      WHERE cliente_id = $1`, [cliente_id]);

      return Number(result.rows[0].monto_total) || 0; // Convierte a número si no es null 

  } catch (err) {
    console.error('Error al obtener monto total:', err);
    throw new Error('Error al obtener monto total');
  }
};

module.exports = {
  obtenerMontoTotal
};

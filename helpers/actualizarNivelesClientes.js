const pool = require("../config/config");

async function asignarNivelFidelizacion(clienteId, puntajeAsignado) {
    try {
        // Obtener el total de puntos acumulados del cliente desde la tabla bolsa_puntos
        const puntosAcumuladosResult = await pool.query(
            'SELECT SUM(saldo_puntos) AS total_puntos FROM bolsa_puntos WHERE cliente_id = $1',
            [clienteId]
        );

        // Obtener los puntos acumulados (si no hay, se asigna 0)
        const totalPuntos = puntosAcumuladosResult.rows[0].total_puntos || 0;

        // Si el puntaje asignado es menor que los puntos acumulados, usamos los puntos acumulados
        const puntajeFinal = puntajeAsignado > totalPuntos ? puntajeAsignado : totalPuntos;

        // Obtener el nivel de fidelización que corresponde al puntaje final
        const niveles = await pool.query(
            'SELECT * FROM niveles_fidelizacion WHERE puntos_minimos <= $1 AND puntos_maximos >= $1',
            [puntajeFinal]
        );

        // Si no se encuentra ningún nivel, devolver un error o manejar el caso
        if (niveles.rows.length === 0) {
            console.log('No se encontró un nivel de fidelización para los puntos proporcionados.');
            return;
        }

        const nivel = niveles.rows[0];

        // Verificar si el cliente ya tiene un nivel asignado
        const clienteNivel = await pool.query(
            'SELECT * FROM cliente_nivel_fidelizacion WHERE cliente_id = $1',
            [clienteId]
        );

        if (clienteNivel.rows.length > 0) {
            // Si el cliente ya tiene un nivel, solo lo actualizamos si es necesario
            await pool.query(
                'UPDATE cliente_nivel_fidelizacion SET nivel_fidelizacion_id = $1, fecha_asignacion = CURRENT_TIMESTAMP WHERE cliente_id = $2',
                [nivel.id, clienteId]
            );
            console.log(`Nivel de fidelización actualizado para el cliente ${clienteId}`);
        } else {
            // Si el cliente no tiene nivel, lo asignamos
            await pool.query(
                'INSERT INTO cliente_nivel_fidelizacion (cliente_id, nivel_fidelizacion_id, fecha_asignacion) VALUES ($1, $2, CURRENT_TIMESTAMP)',
                [clienteId, nivel.id]
            );
            console.log(`Nivel de fidelización asignado al cliente ${clienteId}`);
        }
    } catch (err) {
        console.error('Error al asignar nivel de fidelización:', err);
    }
}



module.exports = { asignarNivelFidelizacion };
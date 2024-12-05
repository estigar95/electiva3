const pool = require("../config/config");

const verNivelCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query(
            'SELECT c.nombre,c.apellido,nf.nombre as Descripcion FROM cliente_nivel_fidelizacion cnf ' + 
            'JOIN cliente c ON cnf.cliente_id = c.id ' + 
            'JOIN niveles_fidelizacion nf ON nf.id = cnf.nivel_fidelizacion_id ' + 
            'WHERE c.id = $1',
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado o sin nivel de fidelización asignado' });
        }

        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Error al obtener el nivel de fidelización del cliente' });
    }
};


module.exports = {
    verNivelCliente
};

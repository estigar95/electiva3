// controllers/conceptoUsoController.js

const pool = require("../config/config");

// Crear un concepto de uso
const crearConceptoUso = async (req, res) => {
    const { descripcion, puntos_requeridos } = req.body;
    try {
        const resultado = await pool.query(
            'INSERT INTO concepto_uso (descripcion, puntos_requeridos) VALUES ($1, $2) RETURNING *',
            [descripcion, puntos_requeridos]
        );
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el concepto de uso' });
    }
};

// Obtener todos los conceptos de uso
const obtenerConceptosUso = async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM concepto_uso');
        res.status(200).json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los conceptos de uso' });
    }
};

// Obtener un concepto de uso por ID
const obtenerConceptoUsoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('SELECT * FROM concepto_uso WHERE id = $1', [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Concepto de uso no encontrado' });
        }
        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el concepto de uso' });
    }
};

// Actualizar un concepto de uso por ID
const actualizarConceptoUso = async (req, res) => {
    const { id } = req.params;
    const { descripcion, puntos_requeridos } = req.body;
    try {
        const resultado = await pool.query(
            'UPDATE concepto_uso SET descripcion = $1, puntos_requeridos = $2 WHERE id = $3 RETURNING *',
            [descripcion, puntos_requeridos, id]
        );
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Concepto de uso no encontrado' });
        }
        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el concepto de uso' });
    }
};

// Eliminar un concepto de uso por ID
const eliminarConceptoUso = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('DELETE FROM concepto_uso WHERE id = $1 RETURNING *', [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Concepto de uso no encontrado' });
        }
        res.status(200).json({ message: 'Concepto de uso eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el concepto de uso' });
    }
};

module.exports = {
    crearConceptoUso,
    obtenerConceptosUso,
    obtenerConceptoUsoPorId,
    actualizarConceptoUso,
    eliminarConceptoUso
};

const db = require("../config/config"); 

// Crear una nueva regla de asignación de puntos
exports.createRegla = (req, res) => {
    const { limite_inferior, 
            limite_superior, 
            monto_equivalencia } = req.body;
    const query = 'INSERT INTO regla_asignacion (limite_inferior, limite_superior, monto_equivalencia) VALUES ($1, $2, $3) RETURNING *';
    const values = [limite_inferior, limite_superior, monto_equivalencia];

    db.query(query, values)
        .then(result => {
            res.status(201).json({ message: 'Regla creada exitosamente', data: result.rows[0] });
        })
        .catch(error => {
            console.error('Error al crear la regla', error);
            res.status(500).json({ message: 'Error al crear la regla', error });
        });
};

// Obtener todas las reglas de asignación
exports.getReglas = (req, res) => {
    const query = 'SELECT * FROM regla_asignacion';

    db.query(query)
        .then(result => {
            res.status(200).json(result.rows);
        })
        .catch(error => {
            console.error('Error al obtener las reglas', error);
            res.status(500).json({ message: 'Error al obtener las reglas', error });
        });
};

// Actualizar una regla de asignación
exports.updateRegla = (req, res) => {
    const { id } = req.params;
    const { limite_inferior, 
            limite_superior, 
            monto_equivalencia } = req.body;
    const query = 'UPDATE regla_asignacion SET limite_inferior = $1, limite_superior = $2, monto_equivalencia = $3 WHERE id = $4 RETURNING *';
    const values = [limite_inferior, limite_superior, monto_equivalencia, id];

    db.query(query, values)
        .then(result => {
            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Regla no encontrada' });
            }
            res.status(200).json({ message: 'Regla actualizada exitosamente', data: result.rows[0] });
        })
        .catch(error => {
            console.error('Error al actualizar la regla', error);
            res.status(500).json({ message: 'Error al actualizar la regla', error });
        });
};

// Eliminar una regla de asignación
exports.deleteRegla = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM regla_asignacion WHERE id = $1 RETURNING *';

    db.query(query, [id])
        .then(result => {
            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Regla no encontrada' });
            }
            res.status(200).json({ message: 'Regla eliminada exitosamente' });
        })
        .catch(error => {
            console.error('Error al eliminar la regla', error);
            res.status(500).json({ message: 'Error al eliminar la regla', error });
        });
};

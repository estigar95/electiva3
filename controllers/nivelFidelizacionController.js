const pool = require('../config/config'); // Importa el pool de conexión

// Crear Nivel Fidelizacion
exports.crearNivelFidelizacion = async (req, res) => {
    const { nombre, 
            puntos_minimos, 
            puntos_maximos
           } = req.body;


     if (puntos_minimos > puntos_maximos) {
        return res.status(400).json({ error: 'El punto mínimo no puede ser mayor que el punto máximo.' });
      }
    
    try {
        const resultado = await pool.query(
            'INSERT INTO niveles_fidelizacion (nombre,puntos_minimos,puntos_maximos) VALUES ($1, $2, $3) RETURNING *',
            [nombre, puntos_minimos, puntos_maximos]
        );
          res.status(201).json({ message: 'Nivel de Fidelizacion registrado correctamente' });
        //res.status(201).json(resultado.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// Obtener todos los Niveles de Fidelizacion
exports.obtenerNivelesFidelizacion = async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM niveles_fidelizacion');
        res.status(200).json(resultado.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Obtener un Nivel de Fidelizacion
exports.obtenerNivelFidelizacion = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('SELECT * FROM niveles_fidelizacion WHERE id = $1', [id]);
        res.status(200).json(resultado.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar Nivel Fidelizacion
exports.actualizarNivelFidelizacion = async (req, res) => {
    const { id } = req.params;
    const { nombre, 
        puntos_minimos, 
        puntos_maximos
       } = req.body;
  

    try {
        const resultado = await pool.query(
            'UPDATE niveles_fidelizacion SET nombre = $1, puntos_minimos = $2, puntos_maximos = $3 WHERE id = $4 RETURNING *',
            [nombre, puntos_minimos,puntos_maximos,id]
        );
                // Si no se encuentra el nivel de Fidelizacion, devuelve un error
                if (resultado.rows.length === 0) {
                    return res.status(404).json({
                        error: 'Nivel no encontrado'
                    });
                }
        res.status(200).json(resultado.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar Nivel Fidelizacion
exports.eliminarNivelFidelizacion = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('SELECT * FROM niveles_fidelizacion WHERE id = $1', [id]);
       
         // Si no se encuentra el nivel de Fidelizacion, devuelve un error
         if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: 'Nivel no encontrado'
            });
        } else {
            await pool.query('DELETE FROM niveles_fidelizacion WHERE id = $1', [id]);

            res.status(200).json({ message: 'Nivel eliminado correctamente' });
            // res.status(204).send();
        }
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
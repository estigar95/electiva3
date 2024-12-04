const pool = require('../config/config'); // Importa el pool de conexión

// Crear Segmento
exports.crearSegmento= async (req, res) => {
    const { nombre, 
            criterio,
            descripcion } = req.body;

    let criterioJSON;
    
    //Para criterio si se inserta en string y no en formato JSON devolvera un error
    try {
        criterioJSON= typeof criterio === 'string' ? JSON.parse(criterio):criterio;
    }catch (error) {
        return res.status(400).json(
                                    {
                                        error:'Criterio no es un JSON válido'
                                    }
        );
    }
    


    try {
        const resultado = await pool.query(
            'INSERT INTO segmentos (nombre, criterio, descripcion) VALUES ($1, $2, $3) RETURNING *',
            [nombre, criterio, descripcion]
        );
          res.status(201).json({ message: 'Segmento registrado correctamente' }); 
        //res.status(201).json(resultado.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Obtener todos los Segmentos
exports.obtenerSegmentos = async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM segmentos');
        res.status(200).json(resultado.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Obtener un Segmento
exports.obtenerSegmento = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('SELECT * FROM segmentos WHERE id = $1', [id]);
        res.status(200).json(resultado.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar Segmento
exports.actualizarSegmento = async (req, res) => {
    const { id } = req.params;
    const { nombre, 
            criterio,
            descripcion 
          } = req.body;
 
          let criterioJSON;
    
          //Para criterio si se inserta en string y no en formato JSON devolvera un error
          try {
              criterioJSON= typeof criterio === 'string' ? JSON.parse(criterio):criterio;
          }catch (error) {
              return res.status(400).json(
                                          {
                                              error:'Criterio no es un JSON válido'
                                          }
              );
          }
          

    try {
        const resultado = await pool.query(
            'UPDATE segmentos SET nombre = $1, criterio = $2, descripcion = $3 WHERE id = $4 RETURNING *',
            [nombre, criterio,descripcion,id]
        );
                // Si no se encuentra el segmento, devuelve un error
                if (resultado.rows.length === 0) {
                    return res.status(404).json({
                        error: 'Segmento no encontrado'
                    });
                }
        res.status(200).json(resultado.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar Segmento
exports.eliminarSegmento = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM segmentos WHERE id = $1', [id]);
       
        res.status(200).json({ message: 'Segmento eliminado correctamente' });
        // res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
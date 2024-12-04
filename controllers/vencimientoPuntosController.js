const pool = require("../config/config");


  // Crear un nuevo vencimiento de puntos
  exports.createVencimientoPuntos = async (req, res) => {
    const { fecha_inicio, 
            fecha_fin, 
            dias_duracion } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO vencimiento_puntos (fecha_inicio, fecha_fin, dias_duracion) VALUES ($1, $2, $3) RETURNING *',
        [fecha_inicio, fecha_fin, dias_duracion]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


// Obtener todos los vencimientos de puntos
exports.getVencimientosPuntos = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM vencimiento_puntos');
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Obtener un vencimiento de puntos por ID
  exports.getVencimientoPuntosById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const result = await pool.query('SELECT * FROM vencimiento_puntos WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Vencimiento no encontrado' });
      }
      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

  
  // Actualizar un vencimiento de puntos
  exports.updateVencimientoPuntos = async (req, res) => {
    const id = parseInt(req.params.id);
    const { fecha_inicio, fecha_fin, dias_duracion } = req.body;
    try {
      const result = await pool.query(
        'UPDATE vencimiento_puntos SET fecha_inicio = $1, fecha_fin = $2, dias_duracion = $3 WHERE id = $4 RETURNING *',
        [fecha_inicio, fecha_fin, dias_duracion, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Vencimiento no encontrado' });
      }
      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Eliminar un vencimiento de puntos
  exports.deleteVencimientoPuntos = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const result = await pool.query('DELETE FROM vencimiento_puntos WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Vencimiento no encontrado' });
      }
      res.status(200).json({ message: 'Vencimiento eliminado correctamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
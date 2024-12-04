const pool = require("../config/config"); // Conexión a la base de datos
const axios = require('axios'); // Para realizar solicitudes HTTP externas

// Enviar datos a un sistema externo
const enviarDatos = async (req, res) => {
    try {
        const { sistema, datos } = req.body;

        if (!sistema || !datos) {
            return res.status(400).json({ error: "Los campos 'sistema' y 'datos' son obligatorios." });
        }

        // Determinar la URL del sistema externo
        const url =
            sistema === "CRM"
                ? process.env.CRM_API_URL
                : sistema === "ERP"
                    ? process.env.ERP_API_URL
                    : null;

        if (!url) {
            return res.status(400).json({ error: "El sistema especificado no es válido." });
        }

        // Realizar la solicitud HTTP
        const response = await axios.post(url, datos, {
            headers: {
                Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
            },
        });

        // Guardar un registro de la integración en la base de datos
        await pool.query(
            `INSERT INTO integracion_logs (sistema, datos_enviados, respuesta)
       VALUES ($1, $2, $3)`,
            [sistema, JSON.stringify(datos), JSON.stringify(response.data)]
        );

        res.status(200).json({ message: "Datos enviados correctamente", data: response.data });
    } catch (error) {
        console.error("Error al enviar datos:", error);
        res.status(500).json({ error: "Error interno del servidor", details: error.message });
    }
};

// Recibir datos desde un sistema externo
const recibirDatos = async (req, res) => {
    try {
        const { origen, datos } = req.body;

        if (!origen || !datos) {
            return res.status(400).json({ error: "Los campos 'origen' y 'datos' son obligatorios." });
        }

        // Procesar los datos recibidos
        console.log(`Datos recibidos desde ${origen}:`, datos);

        // Guardar los datos en la base de datos
        const result = await pool.query(
            `INSERT INTO integracion_datos_recibidos (origen, datos)
       VALUES ($1, $2)
       RETURNING *`,
            [origen, JSON.stringify(datos)]
        );

        res.status(201).json({
            message: "Datos recibidos y almacenados correctamente",
            data: result.rows[0],
        });
    } catch (error) {
        console.error("Error al recibir datos:", error);
        res.status(500).json({ error: "Error interno del servidor", details: error.message });
    }
};

module.exports = {
    enviarDatos,
    recibirDatos,
};

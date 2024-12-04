const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost", 
  user: "postgres",
  password: "Neiderla12",
  database: "bdpwb",
  port: 5432, // Puerto por defecto de PostgreSQL
});

// Verificar la conexión
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error al conectar a la base de datos:", err.stack);
  }
  console.log("Conexión exitosa a la base de datos PostgreSQL");
  release();
});

module.exports = pool;
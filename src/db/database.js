// Importa el módulo de promesas de mysql2
const mysql = require('mysql2/promise');

const {DB_DATABASE,DB_PASSWORD,DB_HOST,DB_USER, DB_PORT} = require('./config')

// Crea la conexión utilizando el módulo de promesas
async function conexionDB() {
    try {
        const conexion = await mysql.createConnection({
            host: DB_HOST,
            database: DB_DATABASE,
            user: DB_USER,
            password: DB_PASSWORD,
            port: DB_PORT
        });
        console.log('Conexión exitosa a la base de datos!');
        return conexion;  // Devuelve la conexión para ser usada en otras partes de la aplicación.
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;  // Relanza el error para manejarlo más arriba o fallar si es necesario.
    }
}

module.exports = conexionDB();  // Exporta la promesa de la conexión.
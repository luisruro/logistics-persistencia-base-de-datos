//Buscamos en npm mysql2
//le damos en quickstart, luego en examples, connections, createPool y createPool(config) y pegamos la promesa

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'logistics',
    port: 3306,
    password: 'Luis1006+',
});

async function getConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to the database');
        return connection;
    } catch (err) {
        console.log('Database connection failed:', err);
        throw err;
    }
}

getConnection();

export { pool }; //Exportamos el pool por si necesitamos realizar alguna operación específica

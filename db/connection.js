const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        // mysql username,
        user: process.env.DB_USER,
        // mysql pw
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME

    },
    console.log('Connected to the election database.')
);

module.exports = db;
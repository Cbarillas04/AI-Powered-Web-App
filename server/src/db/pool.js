import dotenv from 'dotenv';
import MySQL from 'mysql2/promise'; // Library import so we can talk to MySQL 

dotenv.config();

export const pool = MySQL.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
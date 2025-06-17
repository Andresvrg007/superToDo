import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// Configura los datos de tu base de datos
const tasksDB = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER ||  'root',
  password: process.env.DB_PASSWORD ,
  database:  process.env.DB_NAME || 'tasks',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default tasksDB;
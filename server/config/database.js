import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de conexión a MySQL
const pool = mysql.createPool({
  /* host: process.env.DB_HOST || 'localhost', */
  host: process.env.DB_HOST || '194.195.84.52',
  user: process.env.DB_USER || 'u253535907_cn_user',
  password: process.env.DB_PASSWORD || 'c&#Yu4T?e',
  database: process.env.DB_NAME || 'u253535907_codigo_nativo',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Verificar conexión
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conectado a MySQL correctamente');
    connection.release();
  } catch (error) {
    console.error('❌ Error al conectar a MySQL:', error.message);
  }
};

testConnection();

export default pool;

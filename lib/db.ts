import { neon } from '@neondatabase/serverless';

// Crea el cliente de conexión con Neon utilizando la variable de entorno
const sql = neon(process.env.DATABASE_URL || '');

export default sql;
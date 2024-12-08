import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      });

      // Consultando os dados dos usuários
      const [rows] = await connection.query('SELECT Id, FirstName, LastName, Email FROM users');

      // Fechando a conexão após a consulta
      await connection.end();

      // Respondendo com os dados
      res.status(200).json(rows);
    } catch (error) {
      console.error('Erro ao buscar os usuários:', error);
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}




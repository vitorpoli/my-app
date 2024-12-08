import mysql from 'mysql2/promise';
import Cors from 'cors';

const cors = Cors({
  methods: ['GET'], // Permite apenas o método GET
  origin: '*', // Permite qualquer origem
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors); // Aplica o middleware CORS

  if (req.method === 'GET') {
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      });

      const [rows] = await connection.query('SELECT Id, FirstName, LastName, Email FROM users');
      await connection.end();

      res.status(200).json(rows); // Retorna os dados
    } catch (error) {
      console.error('Erro ao buscar os usuários:', error);
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}







import db from '../../../data/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await db.query('SELECT id, FirstName, LastName, Email FROM users');
      res.status(200).json(rows); // Retorna os dados da tabela `users`
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' }); // Para garantir que apenas GET seja permitido
  }
}



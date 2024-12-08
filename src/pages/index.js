import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [users, setUsers] = useState([]); // Estado para armazenar os usuários

  // Função para buscar os dados dos usuários do backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://my-app-seven-rho-75.vercel.app/api/users'); // Rota do backend
        const data = await response.json();
        setUsers(data); // Armazena os usuários no estado
      } catch (error) {
        console.error('Erro ao buscar os usuários:', error);
      }
    };

    fetchUsers(); // Chama a função de busca
  }, []); // A dependência vazia garante que a função só seja chamada uma vez

  return (
    <>
      <Head>
        <title>Users Table</title>
      </Head>
      <div>
        <main>
          <h1>Users Table</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.FirstName}</td>
                    <td>{user.LastName}</td>
                    <td>{user.Email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
}


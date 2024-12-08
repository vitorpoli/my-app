require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const serverless = require("serverless-http");

const app = express();

let con;

// Função para conectar ao banco de dados
const connectToDatabase = async () => {
  if (!con) {
    con = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    await con.connect();
    console.log("Database connection established.");
  }
};

// Rota para buscar usuários
app.get("/api/users", async (req, res) => {
  try {
    await connectToDatabase();

    const query = "SELECT Id, FirstName, LastName, Email FROM users";
    con.query(query, (err, results) => {
      if (err) {
        console.error("Erro ao buscar usuários:", err);
        return res.status(500).json({ error: "Erro ao buscar usuários" });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);
    res.status(500).json({ error: "Erro ao conectar com o banco de dados" });
  }
});

// Expor o app como uma função serverless
module.exports.handler = serverless(app);




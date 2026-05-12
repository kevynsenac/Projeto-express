require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
const jogos = require("./data/db");

app.use(express.static(path.join(__dirname, "public", "homepage")));

// Página Inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "homepage", "index.html"));
});

app.get("/api/jogos", (req, res) => {
  res.status(200).json(jogos);
});

// "/sobre"
app.get("/sobre", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "sobre.html"));
});

// 404 - Fica por último (default)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// Servidor
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server is running on http://${HOST}:${PORT}`);
});

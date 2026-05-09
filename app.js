require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(express.static("public/homepage"));

// Página Inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "homepage", "index.html"));
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
  console.log(`🚀 Servidor rodando em http://${HOST}:${PORT}`);
});

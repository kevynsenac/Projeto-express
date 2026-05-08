require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/sobre", (req, res) => {
  res.send("sobre");
});

app.listen(PORT, () => {
  console.log(`Escutando em http://${HOST}:${PORT}`);
});

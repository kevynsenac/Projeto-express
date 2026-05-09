require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.get("/", (req, res) => {
  res.send("lets go")
})

app.listen(PORT, () => {
  console.log(`Escutando em http://${HOST}:${PORT}`)
})
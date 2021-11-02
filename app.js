const express = require("express");
const db = require("./db.json");

const app = express();
const port = 5000;

app.get('/estados/:id', (req, res) => {
  const { id } = req.params;
  const estado = db.estados.find((e) => e.id === id);

  if (!estado)
    return res.status(400).send();

  const cidades = db.cidades.filter((c) => c.estadoId === id);

  return res.json({
    ...estado,
    cidades,
  })
});

app.get('/estados/:id/cidades', (req, res) => {
  const { id } = req.params;
  const cidades = db.cidades.filter((c) => c.estadoId === id);
  return res.json(cidades);
});

app.get('/estados/:id/capital', (req, res) => {
  const { id } = req.params;
  const capital = db.cidades.find((c) => c.estadoId === id && !!c.capital);
  return res.json(capital);
});

app.get('/capitais', (req, res) => {
  const capitais = db.cidades.find((c) => !!c.capital);
  return res.json(capitais);
});

app.get('*', (req, res) => {
  return res.set({ 'Content-Type': 'text/markdown' })
            .status(200)
            .send(`
# API de Estados Brasileiros

---

* \`/estados/<sigla>\` => Lista todos estados
* \`/estados/<sigla>/cidades\` => Lista todas cidades de um estado
* \`/estados/<sigla>/capital\` => Fornece a capital de um estado
* \`/capitais\` => Lista todas capitais

---
            `);
});

app.listen(port, () => {
  console.log(`Servidor escutando em: http://localhost:${port}`)
});

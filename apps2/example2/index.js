const express = require('express');
const mariadb = require('mysql2'); // sirve también para MariaDB
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const connection = mariadb.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234', 
  database: 'sis313',
});

connection.connect(err => {
  if (err) {
    console.error('❌ Error conectando a MariaDB:', err);
    return;
  }
  console.log('✅ Conectado a MariaDB en puerto 3002');
});

// Obtener usuarios
app.get('/api/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

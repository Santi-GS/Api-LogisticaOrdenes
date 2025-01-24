const express = require('express');
const dotenv = require('dotenv');
const dbconnect = require('./config/db');
const ordenesRoutes = require('./routes/ordenes');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', ordenesRoutes);
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Logística de Órdenes');
});


dbconnect().then(() => {
    console.log('Base de datos conectada exitosamente');
}).catch(err => {
    console.error('Error al conectar la base de datos:', err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});

module.exports = app;

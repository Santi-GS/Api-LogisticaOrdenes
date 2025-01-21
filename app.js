const express = require('express');
const dotenv = require('dotenv');
const dbconnect = require('./config/db');
const ordenesRoutes = require('./routes/ordenes');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', ordenesRoutes);

dbconnect().then(() => {
    console.log('Base de datos conectada exitosamente');
}).catch(err => {
    console.error('Error al conectar la base de datos:', err);
});

module.exports = app;

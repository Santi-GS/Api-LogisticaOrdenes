const express = require('express');
const dotenv = require('dotenv');
const dbconnect = require('./config/db');
const ordenesRoutes = require('./routes/ordenes');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', ordenesRoutes);

dbconnect().then(() => {
    app.listen(3000, () => {
        console.log('Servidor corriendo en http://localhost:3000');
    });
}).catch(err => {
    console.error('No se pudo iniciar el servidor:', err);
});

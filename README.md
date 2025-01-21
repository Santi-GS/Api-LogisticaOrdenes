API Logística


Descripción

La API Logística es un sistema backend diseñado para gestionar órdenes. Proporciona funcionalidades CRUD completas para manejar información de manera eficiente y segura, permitiendo integración con aplicaciones externas.

Características

CRUD completo para órdenes y clientes.

Autenticación de usuarios con JSON Web Tokens (JWT).

Conexión segura con base de datos MongoDB.

Validación de datos para entradas del usuario.

Tecnologías Utilizadas

Backend: Node.js, Express.js.

Base de Datos: MongoDB con Mongoose.

Extras: JSON Web Tokens (JWT), Dotenv para configuraciones de entorno.

Instalación y Uso

Sigue estos pasos para ejecutar el proyecto localmente:

Clonar el repositorio:

git clone https://github.com/Santi-GS/Api-LogisticaOrdenes.git

Instalar dependencias:

npm install

Configurar variables de entorno: Crea un archivo .env en la raíz del proyecto y solicita las variables al dueño de la base de datos.

Ejecutar el servidor:

npm run dev

El servidor se iniciará en http://localhost:3000.

Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

api-logistica/
├── models/         # Modelos de datos (Mongoose)
├── routes/         # Rutas de la API
├── app.js          # Configuración principal
├── .env            # Variables de entorno
├── package.json    # Dependencias y scripts

API Endpoints

Método

Endpoint

Descripción:

POST: /api/auth/login

(Inicio de sesión de usuario)

POST: /api/ordenes

(Crear una nueva orden)

GET: /api/ordenes

(Obtener todas las órdenes)

GET: /api/ordenes/:id

(Obtener una orden específica)

PUT: /api/ordenes/:id

(Actualizar una orden existente)

DELETE: /api/ordenes/:id

(Eliminar una orden)

POST: /api/clientes

(Registrar un nuevo cliente)

GET: /api/clientes

(Listar todos los clientes)


Créditos

Este proyecto fue desarrollado por Santiago Gómez. Puedes visitar mi perfil en GitHub para más proyectos https://github.com/Santi-GS.

Despliegue

https://api-logistica-ordenes.vercel.app/


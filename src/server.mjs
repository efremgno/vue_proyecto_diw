// server.mjs
// import express from 'express' y
// http from 'http' son los modulos que se van a usar
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import mongoose from 'mongoose';
import tareasRouter from './router/tareas.mjs'

const app = express()
// crea el servidor
const server = http.createServer(app)

// ruta para las tareas
app.use('/tareas', tareasRouter)

// usa el puerto 5000 pero en caso de que no esté disponible usa el puerto
app.use(morgan('dev'))
app.use(express.json())

app.set('port', process.env.PORT || 5000)

// ruta inicial
app.get('/', (req, res) => {
    res.send('Hola este es tu servidor de nuevo!');
});

// Inicia el servidor en el 5000

server.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puerto...', app.get('port'));
});
mongoose.connect('mongodb://localhost:27017/bbdd')
    .then(db => console.log('Conectado a la base de datos'))
    .catch(error => console.log('Error al conectar a la base de datos', error))

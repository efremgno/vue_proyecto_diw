// server.mjs
// import express from 'express' y
// http from 'http' son los modulos que se van a usar
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import tareasRouter from './router/tareas.mjs'
import mensajesRouter from './router/mensajes.mjs'
import multer from 'multer'

// crea el servidor
const app = express()
const server = http.createServer(app)
app.use(cors())
app.use(morgan('dev')) 
app.use(express.json())
app.use('/tareas', tareasRouter) // ruta para las tareas
app.use('/mensajes', mensajesRouter) // ruta para los mensajes

const upload = multer({ dest: 'uploads/' })
app.use(upload.single('archivo'))

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

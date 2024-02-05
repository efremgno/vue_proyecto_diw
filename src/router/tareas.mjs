import express from 'express';
const rutas = express.Router();

import tarea from '../models/tarea.mjs';

// otra forma de crear rutas

rutas.get('/', async(req, res) => {
    const tareas = await tarea.find();
    res.json(tareas);
});

router.post('/', async(req, res) => {
    new tarea()
    console.log(new tarea())
})

model.exports = rutas;
//export default rutas;
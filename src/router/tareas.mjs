import express from 'express';
const rutas = express.Router();

import tarea from '../models/tarea.mjs';

rutas.use(express.json());
// otra forma de crear rutas

rutas.get('/', async(req, res) => {
    const tareas = await tarea.find();
    res.json(tareas);
});

/* Antiguo POST:
rutas.post('/', async(req, res) => {
    new tarea()
    console.log(new tarea())
})*/

rutas.post('/', async(req, res) => {
    try {
      const nuevatarea = new tarea(req.body);
      
      await nuevatarea.save();
          console.log(nuevatarea);
          res.json({
          status: 'Tarea guardada'
        
        });
    } catch (error) {
    console.error('Error al guardar la tarea:', error);
    res.status(500).json({
        error: 'Error al guardar la tarea'
    });
  } 
  });

rutas.put ('/:id', async(req, res) => {
    try {
        await tarea.findByIdAndUpdate(req.params.id, req.body);
        res.json({
            status: 'Tarea actualizada'
        });
    } catch (error) {
        console.log('Error al actualizar la tarea:', error);
        res.status(500).json({
            error: 'Error al actualizar la tarea'
        });
    }
});

rutas.delete ('/:id', async(req, res) => {
    try {
        await tarea.findByIdAndDelete(req.params.id, req.body);
        res.json({
            status: 'Tarea eliminada'
        });
    } catch (error) {
        console.log('Error al eliminar la tarea:', error);
        res.status(500).json({
            error: 'Error al eliminar la tarea'
        });
    }
});

//module.exports = rutas;
export default rutas;

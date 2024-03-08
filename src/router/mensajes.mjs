import express from 'express';
const rutas = express.Router();

import mensaje from '../models/mensaje.mjs';

rutas.use(express.json());

rutas.post('/', async (req, res) => {
    try {
        const nuevoMensaje = new mensaje(req.body);

        await nuevoMensaje.save();
        console.log(nuevoMensaje);
        res.json({
            status: 'Mensaje enviado'

        });
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        res.status(500).json({
            error: 'Error al enviar el mensaje'
        });
    }
});


//module.exports = rutas;
export default rutas;

import mongoose from "mongoose";
const { Schema } = mongoose;

const tareaSchema = new Schema({
    nombre: String,
    asunto: String,
    departamento: [String],
    mensaje: String
    });

export default mongoose.model('mensaje', tareaSchema);
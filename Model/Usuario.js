const mongoose = require("mongoose");

// Defino el esquema de un usuario
const usuarioEsquema = new mongoose.Schema({
    nombre: String,
    edad: Number,
    email: String,
})

// Creo el modelo
const modeloUsuario = mongoose.model('Usuario',usuarioEsquema);
module.exports = modeloUsuario;
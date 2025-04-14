
// Requerimos los moduilos
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Usuario = require('./Model/Usuario');

//Inicializamos
dotenv.config();

const app = express();

app.use(express.json());

// Conecto con MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Conexion Exitosa a MongoDN");
    }).catch((err) => {
        console.log("No se puedo conectar: ", err)
    })

//Ruta Get/usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find(); //busca todos los usuarios
        res.json(usuarios); // devuelve los usuarios como JSon
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener usuarios', error });
    }
});

//Ruta Post/usuarios
app.post('/usuarios', async (req, res) => {
    try {
        //Creo y guardo el nuevo usurario
        const nuevoUsuario = new Usuario(req.body);
        const usuarioGuardado = await nuevoUsuario.save();

        res.status(201).json(usuarioGuardado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el usuario', error });
    }
});

//Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
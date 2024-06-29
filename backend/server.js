const express = require('express'); // npm install express 
const mongoose = require('mongoose'); //npm install mongoose
const bodyParser = require('body-parser'); // npm install body-parser
const cors = require('cors'); // npm install cors

const app = express(); //crear instalacia de una aplicación Express
app.use(cors()); // Hablitar CORS para todas mis rutas para que acepte solicitudes de cualquier origen 

app.use(bodyParser.json()); // Analizar cuerpos de solicitudes en formato JSON 

//Generar la Conexón a MongoDB
mongoose.connect('mongodb://localhost:27017/vuejs',
    {
        //useNewUrlParser: true, //
        //useUnifiedTopology: true,  //
    }
);


const db = mongoose.connection;

// Definición de Esquema 

const usuarioSchema = new mongoose.Schema({
    id: Object,
    usuario: String,
    correo: String,
    password: String
});

// Creación de Modelos 
const Usuario = mongoose.model('Usuarios',usuarioSchema);

//Pertenencientes a HTTP 

//Crear nuestras urls de datos 

//GET -- Nos devuelve infomormación de la BD 
// http://localhost:3000/usuarios
app.get('/usuarios', async(req,res) =>{
    try {
        const usuarios = await db.collection('usuarios').find().toArray();
        res.json({ usuarios });
        console.log("Respuesta:\n",usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios: ',error);
        res.status(500).json({ error: 'Error Interno del Servidor'});
    }
});


app.post('/login', async(req, res)=>{
    try{
        const {correo, password} = req.body;
        const usuario = await Usuario.findOne({correo, password});
        console.log(`\nEl usuario ${correo} se está intentando loguear`);
        if(usuario){
            res.json(usuario);
        }else{
            res.status(401).json({mensaje: 'Credenciales inválidad'});
        }
    }catch(error){
        console.error('Error en el logueo de usuario', error);
        res.status(500).json({mensaje: 'Error interno en el servidor'});

    }
});

//POST - Registrar un dato en nuestra base 

//PUT - Editar Información 

//DELETE - Eliminar Información 


//Pasos para finalizar Servidor 
const corsOptions = {
    origin: 'http://localhost:3000',  // Solo permite solicitudes desde este origen
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  // Habilita el uso de credenciales (por ejemplo, cookies)
  optionsSuccessStatus: 204,
};

// app.use('/login', cors(corsOptions));

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`\nServidor esta escuchando en puerto ${PORT}`);
});
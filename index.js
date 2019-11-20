const express = require('express')
const cors = require('cors')
const app = express()
const router = express.Router()
const server = require('http').Server(app)
const fileUpload = require('express-fileupload')
const io = require('socket.io')(server)
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(fileUpload())
app.use(router)
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});
app.use(express.static('public'))
io.on('connection', (socket) => {
        console.log('Usuario conectado')
        socket.emit('mensaje', 'Bienvenido')
    })
    // setInterval(() => {
    //     io.emit('mensaje', 'hola, esta es una emicion de test')
    // }, 3000)

router.post('/enviar', (req, res) => {
    console.table(req.body)
    io.emit('mensaje', req.body)
    res.status(200).json({
        status: 'mensaje emitido',
        mensaje: req.body
    })
})

server.listen(8080, () => {
    console.log('Iniciado en http://localhost:8080')
})
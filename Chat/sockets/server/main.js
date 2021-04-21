var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require("socket.io")(server);

//array de los mensjaes
var messages =[{
  id: 1,
  text: "Bienvenido al CHAT INTERACTIVO",
  author: "Sala#1"

}]

app.use(express.static('public'));

app.get('/', function(req, res){
  res.status(200).send("Hola Mundo0");

});

io.on('connection',function(socket){
  console.log('alguien se ha Conectado');
  socket.emit('messages', messages);
  //recibimos el Mensaje, aqui podemos indicar en donde guardar los mensajes
  socket.on('new-messages', function(data) {
    messages.push(data);
    //da un mensaje a todos los que estan conectados
    io.sockets.emit('messages',messages);

  });
});

server.listen(3000, function(){
  console.log("Server Corriendo Exitosamente en http://localhost:3000");
});

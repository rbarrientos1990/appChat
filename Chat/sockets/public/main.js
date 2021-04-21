var socket = io.connect('http://localhost:3000', {'forceNew': true});

socket.on('messages', function(data){
  console.log(data);
  render(data);
})

//llega varios elementos
function render (data){
  var html = data.map(function(elem, index){
//returna el array para cada elemento.
    return (
      `<div>
        <strong>${elem.author}</strong>:
        <em>${elem.text}</em>
      </div>`);

  }).join(" ");



  document.getElementById('messages').innerHTML = html;
}

//funcion para añadir un Mensaje
function addMessage(e){
  var payload = {
    author: document.getElementById('username').value,
    text:   document.getElementById('texto').value
  };

  //despues de tener los datos ya en los imput se ejecuta lo siguiente
  socket.emit('new-messages',payload);
  this.username = " ";
  this.texto = " ";
  return false;


}

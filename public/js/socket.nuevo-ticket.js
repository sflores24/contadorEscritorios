//Se establece la comunicación
var socket = io();
var label = $('#lblNuevoTicket');

//Escuchando información
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

//Escuchando información
socket.on('disconnect', function() {
    console.log('Desconectado al servidor');
});

socket.on('estadoActual', function(respuesta) {
    label.text(respuesta.actual);
});

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});
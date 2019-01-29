//Se establece la comunicación
var socket = io();
//Para obtener los parametros que se estan enviando por la URL
var searchParams = new URLSearchParams(window.location.search);

//Escuchando información
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

//Escuchando información
socket.on('disconnect', function() {
    console.log('Desconectado al servidor');
});

//Validamos que si traiga escritorio
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var small = $('small');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(respuesta) {
        if (respuesta === 'No hay tickets') {
            small.text(respuesta);
            alert(respuesta);
            return;
        }

        small.text('Ticket ' + respuesta.numero);
    });
});
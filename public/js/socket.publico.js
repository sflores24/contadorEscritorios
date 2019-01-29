var socket = io();
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('estadoActual', function(respuesta) {
    actualizaHTML(respuesta.ultimosTickets);
});

socket.on('ultimosTickets', function(respuesta) {
    var audio = new Audio('./audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(respuesta.ultimosTickets);
});

function actualizaHTML(ultimosTickets) {
    for (var i = 0; i < ultimosTickets.length; i++) {
        lblTickets[i].text('Ticket ' + ultimosTickets[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimosTickets[i].escritorio);
    }
}
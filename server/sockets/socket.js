const { io } = require('../server');
const { TicketControll } = require('../classes/ticket-control');

const ticketControl = new TicketControll();

io.on('connection', (client) => {
    //Se obtiene el siguiente ticket
    client.on('siguienteTicket', (data, callback) => {
        let siguienteTicket = ticketControl.siguiente();
        callback(siguienteTicket);
    });

    //Se envia el ticket actual
    client.emit('estadoActual', {
        actual: ticketControl.getUltimo(),
        ultimosTickets: ticketControl.getUltimosTickets()
    });

    //Se espera petición e atender ticket
    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        client.broadcast.emit('ultimosTickets', {
            ultimosTickets: ticketControl.ultimosTickets
        });
    });

});
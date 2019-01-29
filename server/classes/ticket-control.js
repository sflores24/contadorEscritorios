//Librerias
const fs = require('fs');

//Clases basadas en ES6
class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControll {
    /**
     * Se obtiene el día de hoy, se carga la información del archivo data.json
     * En caso de que si sea igual a hoy cargamos el ultimo día y los tickets que se 
     * estan trabajando
     */
    constructor() {
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosTickets = [];
        let data = require('../data/data.json');
        console.log(data);
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosTickets = data.ultimosTickets;
        } else {
            this.reiniciarConteo();
        }

    }

    /**
     * Se obtiene el valor del siguiente ticket
     * Se genera un nuevo ticket y se agrega al arreglo
     */
    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    /**
     * Se inicializan los valores
     */
    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosTickets = [];
        this.grabarArchivo();
    }

    /**
     * Obtiene el ultimo ticket
     */
    getUltimo() {
        return `Ticket ${this.ultimo}`;
    }

    /**
     * Obtiene los ultimos 4 tickets
     */
    getUltimosTickets() {
        return this.ultimosTickets;
    }

    /**
     * Graba la información de los tickets en el archivo
     */
    grabarArchivo() {
        let jsonData = {
            'ultimo': this.ultimo,
            'hoy': this.hoy,
            'tickets': this.tickets,
            'ultimosTickets': this.ultimosTickets
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //Eliminamos el elemento que estamos sacando

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        console.log(this.ultimosTickets);
        //Lo ponemos al inicio del arreglo
        this.ultimosTickets.unshift(atenderTicket);

        if (this.ultimosTickets.length > 4) {
            this.ultimosTickets.splice(-1, 1);
        }

        this.grabarArchivo();

        return atenderTicket;
    }
}

module.exports = {
    TicketControll
}
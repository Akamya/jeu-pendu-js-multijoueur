// WSManager contains the list of current connected user in the server
module.exports = class WSManager {
    constructor() {
        this.clients = [];
    }
    
    addClient(client) {
        this.clients.push(client);
    }
    
    removeClient(client) {
        this.clients = this.clients.filter(c => c !== client);
    }
    
    broadcast(message) {
        this.clients.forEach(client => client.send(message));
    }
    
    broadcastExcept(message, client) {
        this.clients.forEach(c => {
            if (c !== client) {
                c.send(message);
            }
        });
    }
}
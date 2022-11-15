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
        this.clients.forEach(client => client.send(JSON.stringify(message)));
    }
    
    broadcastExcept(message, client) {
        this.clients.forEach(c => {
            if (c !== client) {
                c.send(JSON.stringify(message));
            }
        });
    }

    getUserFromId(id) {
        return this.clients.find(c => c.id === id);
    }

    get users() {
        return this.clients.map(c => c.id);
    }

    get size() {
        return this.clients.length;
    }
}
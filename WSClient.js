// Class for client WS connection handling
const uuidv4 = require("uuid/v4")

module.exports = class Client {
    constructor(ws) {
        this.ws = ws;
        this.id = uuidv4();
    }

    send(message) {
        this.ws.send(message);
    }

    close() {
        this.ws.close();
    }

    getId() {
        return this.id;
    }

}
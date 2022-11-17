// Create WS server
var WebSocketServer = require('ws').Server;
const WSManager = require('./WSManager');
const Game = require('./Game');

var wss = new WebSocketServer({port: 8080});

// Create a WSManager to manage all the connected clients
var wsManager = new WSManager();

// Create a Game to manage all the games
var game = new Game();

// When a client connects to the server
wss.on('connection', function connection(ws) {
    // Add the client to the WSManager
    ws.id = Date.now();
    wsManager.addClient(ws);
    // Send the list of connected users to all the clients
    wsManager.broadcast({type: 'users', users: wsManager.users});

    // When the client sends a message
    ws.on('message', message => {
        console.log('received: %s', message);
        let obj = JSON.parse(message);
        console.log(obj.message);
        if (obj.type === 'message') {
            // Broadcast the message to all the clients
            wsManager.broadcast({type: 'message', message: obj.message, user: ws.id});
        } else if (obj.type === 'request') {
            if (obj.request === 'createGame') {
                // Create a game
                game.createGame();
                // Send the game ID to the client
                ws.send(JSON.stringify({type: 'gameCreated', id: game.gameList[game.gameList.length - 1].id}));
            }
        }
    });
    
    // When the client disconnects
    ws.on('close', function close() {
        // Remove the client from the WSManager
        wsManager.removeClient(ws);
    });
});
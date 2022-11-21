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
    ws.send(JSON.stringify({type: 'uid', uid: ws.id}));

    // For debugging purpose only, show the list of connected users
    console.log('Connected users: ' + wsManager.users);

    // When the client sends a message
    ws.on('message', message => {
        let obj = JSON.parse(message);
        if (obj.type === 'message') {
            // Print the message in the console
            console.log('received: %s\n', obj.message);
        } else if (obj.type === 'request') {
            if (obj.request === 'createGame') {
                // Create a game
                game.createGame();
                // Send the game ID to the client
                ws.send(JSON.stringify({type: 'gameCreated', id: game.gameList[game.gameList.length - 1].id}));
                // Add the client to the game
                game.addPlayerToGame(ws.id, game.gameList[game.gameList.length - 1].id);
                // Send the list of players to the client
                ws.send(JSON.stringify({type: 'players', players: game.getPlayersFromGame(game.gameList[game.gameList.length - 1].id)}));

                // For debugging purpose only, show the list of games and the list of players in the game
                console.log('Game list: ' + JSON.stringify(game.gameList) + '\n');
                console.log('Players in game: ' + game.gameList[game.gameList.length - 1].users + '\n');
            } else if(obj.request === 'joinGame') {
                console.log(obj);
                // Add the client to the game
                if(game.addPlayerToGame(ws.id, obj.id)) {
                    // Send the list of players to all the client
                    wsManager.broadcast({type: 'players', players: game.getPlayersFromGame(obj.id)});
                    // Send join game message to the client
                    ws.send(JSON.stringify({type: 'gameJoined', id: obj.id}));
                }

                // For debugging purpose only, show the list of games and the list of players in the game
                console.log('Game list: ' + JSON.stringify(game.gameList) + '\n');
                console.log('Players in game: ' + game.getPlayersFromGame(obj.id) + '\n');
            }
        }
    });
    
    // When the client disconnects
    ws.on('close', function close() {
        // Remove the client from the WSManager
        wsManager.removeClient(ws);
    });
});
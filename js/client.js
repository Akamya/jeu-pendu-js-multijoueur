const ws = new WebSocket('ws://localhost:8080');

// While the game is in waiting mode, the client show a waiting screen
let waitingScreen = document.getElementById('mainMenu');
let gameMenu = document.getElementById('gameMenu');
waitingScreen.style.display = 'block';
gameScreen.style.display = 'none';

ws.onopen = () => {
    console.log('connected');
    ws.send(JSON.stringify({type: 'message', message: 'Hello server!'}));
};

ws.onmessage = (event) => {
    // Parse the message
    console.log(event.data);
    let obj = JSON.parse(event.data);
    // If the message is a list of users
    if (obj.type === 'uid') {
        // Set the user ID
        ws.uid = obj.uid;
        console.log('My ID is ' + ws.uid);
    } else if (obj.type === 'message') {
        // If the message is a message
    } else if (obj.type === 'gameCreated' || obj.type === 'gameJoined') {
        // If the message is a game created
        // Hide the waiting screen
        waitingScreen.style.display = 'none';
        // Show the game screen
        gameScreen.style.display = 'block';
        // Set the game ID in the game screen
        document.getElementById('gameID').innerHTML = obj.id;
    } else if (obj.type === 'players') {
        // If the message is a list of players
        // Update the html list of players
        console.log('new players list: ' + obj.players);
        let players = document.getElementById('players');
        players.innerHTML = '';
        obj.players.forEach(player => {
            let li = document.createElement('li');
            li.appendChild(document.createTextNode(player));
            players.appendChild(li);
        });
    }
};

// Add listener to the create button, then send create request and user ID
document.querySelector('#createGame').addEventListener('click', () => {
    ws.send(JSON.stringify({type: 'request', request: 'createGame'}));
    console.log({type: 'request', request: 'createGame'});
});

// Add listener to the join button, then send join request and user ID
document.getElementById('joinGameBtn').addEventListener('click', () => {
    let gameID = document.getElementById('joinGameTxt').value;
    let obj = {type: 'request', request: 'joinGame', id: gameID};
    console.log(obj);
    ws.send(JSON.stringify(obj));
});

// Add query selector for the form and the button
const form = document.querySelector('form');
const button = document.querySelector('button');

// When the user clicks on the button
document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    // We get the value entered in the form
    let lettre = document.querySelector('#lettre').value;
    // We send the letter to the server
    ws.send(JSON.stringify(lettre));
    // We empty the form
    document.querySelector('#lettre').value = '';
});

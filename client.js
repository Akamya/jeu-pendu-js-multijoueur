const ws = new WebSocket('ws://localhost:8080');

// While the game is in waiting mode, the client show a waiting screen
let waitingScreen = document.getElementById("mainMenu");
let gameMenu = document.getElementById("gameMenu");
waitingScreen.style.display = 'block';
gameScreen.style.display = 'none';




ws.onopen = () => {
    console.log('connected');
    ws.send(JSON.stringify({type: 'message', message: 'Hello server!'}));
};

ws.onmessage = (event) => {
    // Parse the message
    let obj = JSON.parse(event.data);
    // If the message is a list of users
    if (obj.type === 'users') {
    } else if (obj.type === 'message') {
        // If the message is a message
    } else if (obj.type === 'gameCreated') {
        // If the message is a game created
        // Hide the waiting screen
        waitingScreen.style.display = 'none';
        // Show the game screen
        gameScreen.style.display = 'block';
        
    }
};

// Add listener to the create button, then send create request and user ID
document.querySelector('#createGame').addEventListener('click', () => {
    ws.send(JSON.stringify({type: 'request', request: 'createGame'}));
    console.log({type: 'request', request: 'createGame'});
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

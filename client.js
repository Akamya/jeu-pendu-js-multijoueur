const ws = new WebSocket('ws://localhost:8080');

// connect to the server
ws.onopen = () => {
    ws.send('Hello server!');
}

// On server message
ws.onmessage = (event) => {
    console.log('message => ', event.data);
}

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

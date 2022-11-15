const WebSocket = require('ws');
const WORD = "PROTOCOL";
let CLIENTS = [];
let playerTry = 10;
// On créé notre Web Serveur qui écoute sur le port 8080
const wss = new WebSocket.Server({
    port: 8080
});


// Lorsqu'un client se connecte on reçoit un événement 'connection'
wss.on('connection', ws => {

    CLIENTS.push(ws);
    ws.send(`${WORD.length}`);
    ws.send(`$${playerTry}`);
    // Lorsqu'il nous envoie un message on reçoit un événement message ainsi que le message !
    ws.on('message', message => {
        console.log(`Received message => ${message}`);
        let formatLetter = message.toString().replace(/['"]+/g, '').toUpperCase();
        let index = checkLetter(formatLetter);
        if(index != -1){
           CLIENTS.forEach(client => {
            client.send(`#${formatLetter}${index}`);
            console.log(`#${formatLetter}${index}`);
           })
        }else{
            playerTry--;
            CLIENTS.forEach(client => {
                client.send(`$${formatLetter}${playerTry}`)
            })
        }
    });

});

// On vérifie si la lettre est dans le mot
function checkLetter(letter){
    var indices = [];
    for(var i=0; i<WORD.length;i++) {
        if (WORD[i] === letter) indices.push(i);
    }
    console.log(indices);
    if(indices.length > 0) return indices;
    else return -1;
}
const connection = new WebSocket('ws://localhost:8080');

connection.onopen = () => {
    console.log('connected');
};

connection.onclose = () => {
    console.error('disconnected');
};

connection.onerror = error => {
    console.error('failed to connect', error);
};

connection.onmessage = event => {

    let myUl = document.getElementById('mot');

    console.log('message => ', event.data);

    
    if(event.data[0] == "#") { // # pour les retour positifs
        let letter = event.data[1];
        let index = event.data.substring(2).split(",");
        
        let items = myUl.getElementsByTagName("li");

        if(index.length > 1){
            for(let i = 0; i < index.length; i++){
                items[index[i]].innerHTML = letter;
            }
        }else{
            items[index].innerHTML = letter;
        }
    } if(event.data[0] == "$") { // $ pour les retours négatifs suite au pv 
        if(!isNaN(event.data[1])) {
            document.getElementById("vie").innerHTML = "Nombre de vies : " + event.data.replace(/['$]+/g, '');
        } else {
            let listUl = document.getElementById('list');
            let li = document.createElement('li');
            li.innerHTML = event.data[1];
            li.style = 'display: inline; margin: 0 5px;';
            listUl.appendChild(li);
            document.getElementById("vie").innerHTML = "Nombre de vies : " + event.data.substring(2);
        }

    } else { // plain text pour l'initialisation du jeu
        
        for(let i = 0; i < event.data; i++){
            let li = document.createElement('li');
            li.innerHTML = '_';
            li.style = 'display: inline; margin: 0 5px;';
            myUl.appendChild(li);
        }
    }
};

// Lorsque l'on clique sur le bouton envoyer
document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();

    let listUl = document.getElementById('list');
    let items = listUl.getElementsByTagName("li");
    let flag = false;

    // On récupère la valeur entrée dans le formulaire
    let lettre = document.querySelector('#lettre').value;
    // On vérifie le contenu de la valeur
    if(!lettre.match(/^[a-zA-Z]+$/)) 
        document.getElementById("message").innerHTML = "Veuillez entrer une lettre";
    
    for(let i = 0; i < items.length; i++) {
        console.log(items[i])
        if(items[i].innerHTML === lettre.toUpperCase())
            flag = true;
    }

    if(!flag) {
        // On envoie la lettre au serveur
        connection.send(JSON.stringify(lettre));
        // On vide le formulaire
        document.querySelector('#lettre').value = '';
        document.getElementById("message").innerHTML = "";
    } else {
        document.getElementById("message").innerHTML = "Cette lettre a déjà été utilisée";
    }
});

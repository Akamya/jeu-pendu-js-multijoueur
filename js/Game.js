// Class du pendu
module.exports = class Game {
    constructor() {
        this.gameList = [];
    }

    // Fonction pour créer une partie
    createGame() {
        console.log("Game is being created");
        // On crée un id unique pour la partie
        let id = this.makeid(5);
        // On ajoute la partie à la liste des parties
        this.gameList.push({
            users: [],
            word: '',
            letters: [],
            state: 'waiting',
            tries: 10,
            id: id, 
            started: false,
            finished: false
        }); 
    }

    makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    // Fonction pour ajouter un joueur à une partie
    addPlayerToGame(id, user) {
        // On récupère la partie
        let game = this.gameList.find(g => g.id === id);
        // On ajoute le joueur à la partie
        game.users.push(user);
    }

    // Fonction pour laisser un joueur rejoindre une partie
    joinGame(id, user) {
        // On récupère la partie
        let game = this.gameList.find(g => g.id === id);
        // On ajoute le joueur à la partie
        game.users.push(user);  
    }
}
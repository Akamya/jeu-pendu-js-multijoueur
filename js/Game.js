// Class du pendu
module.exports = class Game {
    constructor() {
        this.gameList = [];
    }

    // Fonction pour créer une partie
    createGame() {
        console.log('Game is being created');
        // On crée un id unique pour la partie
        let id = this.makeid(5);
        // On ajoute la partie à la liste des parties
        this.gameList.push({
            users: [],
            word: '',
            letters: [],
            state: 'waiting',
            tries: 10,
            id: this.makeid(5), 
            started: false,
            finished: false,
            gameMaster: '',
            gameHost: ''
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
    addPlayerToGame(id, gameId) {
        // On récupère la partie
        let game = this.gameList.find(g => g.id === gameId);
        // On ajoute le joueur à la partie
        game.users.push(id);
        return true;
    }

    // Fonction pour laisser un joueur rejoindre une partie
    joinGame(id, user) {
        // On récupère la partie
        let game = this.gameList.find(g => g.id === id);
        // On ajoute le joueur à la partie
        game.users.push(user);  
    }

    // Fonction pour retourner la liste des joueurs d'une partie
    getPlayersFromGame(id) {
        // On récupère la partie
        let game = this.gameList.find(g => g.id === id);
        // On retourne la liste des joueurs
        return game.users;
    }

    // Fonction pour supprimer un joueur d'une partie
    removePlayerFromGame(id, gameId) {
        // On récupère la partie
        let game = this.gameList.find(g => g.id === gameId);
        // On supprime le joueur de la partie
        game.users.splice(game.users.indexOf(id), 1);
    }

    // Fonction pour supprimer une partie
    removeGame(id) {
        // On supprime la partie de la liste des parties
        this.gameList.splice(this.gameList.indexOf(id), 1);
    }

    // Fonction pour retourner la liste des parties
    getGameList() {
        return this.gameList;
    }

    // Fonction pour retourner une partie
    getGame(id) {
        return this.gameList.find(g => g.id === id);
    }

    // Fonction pour retourner le nombre de parties
    getGameCount() {
        return this.gameList.length;
    }

    // Fonction pour retourner le nombre de joueurs dans une partie
    getPlayerCount(id) {
        // On récupère la partie
        let game = this.gameList.find(g => g.id === id);
        // On retourne le nombre de joueurs
        return game.users.length;
    }

    // Fonction pour donner l'hôte de la partie
    setGameHost(id, user) {
        // On récupère la partie
        let game = this.gameList.find(g => g.id === id);
        // On donne l'hôte à la partie
        game.gameHost = user;
    }

    // Fonction pour créer un game master de manière aléatoire
    setGameMaster(id) {
        // On récupère la partie
        let game = this.gameList.find(g => g.id === id);
        // On définit le game master
        game.gameMaster = game.users[Math.floor(Math.random() * game.users.length)];
    }
    
}
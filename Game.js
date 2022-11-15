// Class du pendu
module.exports = class Game {
    constructor() {
        this.word = "";
        this.letters = [];
        this.guesses = [];
        this.guessesLeft = 10;
    }
}
const gameCells = document.querySelectorAll(".gameCell");
const message = document.querySelector('#message');


const players = ['X', 'O'];
const winResults = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
const board = new Array(9);
// ['X', 'O', 'X',
//  'O', 'X', 'O',
//  'X', 'O', 'X']
let currentPlayer;

function setNextPlayer() {
    if (currentPlayer === players[0]) {
        currentPlayer = players[1];
    } else {
        currentPlayer = players[0];
    }
}

function checkWinner(player) {
    for (let winResult of winResults) {

        let isWinner = true;

        for (let result of winResult) {
            if (board[result - 1] !== player) {
                isWinner = false;
                break;
            }
        }
        if (isWinner) {
            endGame(`Ha ganado el jugador ${player}`);
            break;
        }

    }
}

function endGame(gameMessageStr) {
    message.innerText = gameMessageStr;

    gameCells.forEach(gameCell => gameCell.removeEventListener('click', fillCellEvent));
}

function fillCellEvent() {
    this.removeEventListener('click', fillCellEvent);
    this.innerText = currentPlayer;
    board[parseInt(this.getAttribute("game-cell")) - 1] = currentPlayer;
    console.log(board);
    checkWinner(currentPlayer);
    setNextPlayer();
}

function setFirstPlayer(player) {
    currentPlayer = player;
    message.innerText = `Comienza el juego! empieza el jugador ${player}`;
    gameCells.forEach(gameCell => gameCell.addEventListener('click', fillCellEvent));
}

function askFirstPlayer() {
    const button1 = document.createElement("button");
    button1.innerText = players[0];
    button1.addEventListener('click', () => setFirstPlayer(players[0]));
    const button2 = document.createElement("button");
    button2.innerText = players[1];
    button2.addEventListener('click', () => setFirstPlayer(players[1]));
    message.append("Elige el primer jugador: ", button1, button2);
}

askFirstPlayer();


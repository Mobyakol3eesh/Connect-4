class Player {
    number;
    score;
}
class Turn {
    player;
    constructor() {
        this.player = Math.floor(Math.random() * 2) + 1;
    }
    changePlayer() {
        this.player = this.player === 1 ? 2 : 1;
    }
    getTurn() {
        return this.player;
    }
}
class Circle {
    player;
    color;
    constructor(player, color) {
        this.player = player;
        this.color = color;
    }
}
class RedCircle extends Circle {
    constructor(player) {
        super(player, "red");
    }
}
class YellowCircle extends Circle {
    constructor(player) {
        super(player, "yellow");
    }
}
class Board {
    boardArr;
    constructor(rows, cols) {
        this.boardArr = Array.from({ length: rows }, () =>
            Array(cols).fill(null)
        );
    }
}

const rows = 6;
const cols = 7;
const gameBoard = document.querySelector(".game-board");

const player1 = new Player(1, 0);
const player2 = new Player(2, 0);
const turn = new Turn();
const board = new Board(rows, cols);

(function GameLoad() {
    for (let i = 0; i < rows; i++) {
        gameBoard.innerHTML += `
                <div class="row cells" data-row="${i}">
                <div class="cell" data-column="0"></div>
                <div class="cell" data-column="1"></div>
                <div class="cell" data-column="2"></div>
                <div class="cell" data-column="3"></div>
                <div class="cell" data-column="4"></div>
                <div class="cell" data-column="5"></div>
                <div class="cell" data-column="6"></div>
            </div>`;
    }
})();

document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", (e) => {
        const column = e.target.dataset.column;
        const playerTurn = turn.getTurn();
        insertCircle(getLowestEmptyRow(column), playerTurn);
    });
});

function getLowestEmptyRow(column) {
    const cells = document.querySelectorAll(`.cell[data-column="${column}"]`);
    for (let i = cells.length - 1; i >= 0; i--) {
        if (!cells[i].classList.contains("empty")) {
            cells[i].classList.add("empty");
            console.log(cells[i].parentElement.dataset.row);
            return cells[i];
        }
    }
}
function insertCircle(cell, playerTurn) {
    if (cell) {
        const circleRow = cell.parentElement.dataset.row;
        const circleColumn = cell.dataset.column;
        if (playerTurn === 1) {
            const circle = new YellowCircle(playerTurn);

            board.boardArr[circleRow][circleColumn] = circle;
            cell.style.backgroundColor = circle.color;
            console.log(board.boardArr);
        } else {
            const circle = new RedCircle(playerTurn);
            board.boardArr[circleRow][circleColumn] = circle;
            cell.style.backgroundColor = circle.color;
            console.log(board.boardArr);
        }
        checkWinner(board.boardArr, playerTurn, circleColumn, circleRow);
        turn.changePlayer();
    }
}

function checkWinner(boardArr, circleColumn, playerTurn, circleRow) {
    if (checkHorizontal(boardArr, playerTurn, circleColumn, circleRow))
        //     checkVertical(boardArr,circleColumn,circleRow) ||
        //     checkDiagonal(boardArr,circleColumn,circleRow)
        // ) 
{}
}

function checkHorizontal(boardArr, playerTurn, circleColumn, circleRow) {
    if (boardArr[circleRow][circleColumn] instanceof Circle) {
        const CircleType = playerTurn === 1 ? YellowCircle : RedCircle;
        for (let i = 0; i < boardArr[circleRow].length - 3; i++) {
            if (
                boardArr[circleRow][i] instanceof CircleType &&
                boardArr[circleRow][i] === boardArr[circleRow][i + 1] &&
                boardArr[circleRow][i] === boardArr[circleRow][i + 2] &&
                boardArr[circleRow][i] === boardArr[circleRow][i + 3]
            ) {
                console.log("Winner");
                return true;
            }
        }
    }
    return false;
}
function checkVertical(boardArr) {
    for (let i = 0; i < boardArr[0].length; i++) {
        for (let j = 0; j < boardArr.length - 3; j++) {
            if (
                boardArr[j][i] === boardArr[j + 1][i] &&
                boardArr[j][i] === boardArr[j + 2][i] &&
                boardArr[j][i] === boardArr[j + 3][i]
            ) {
                return true;
            }
        }
    }
}
function checkDiagonal(boardArr) {
    boardArr.forEach((row) => {
        for (let i = 0; i < row.length - 3; i++) {
            if (
                row[i] === row[i + 1] &&
                row[i] === row[i + 2] &&
                row[i] === row[i + 3]
            ) {
                return true;
            }
        }
    });
}

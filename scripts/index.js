class Player {
    number;
    score;
}
class Turn {
    player;
    constructor() {
        this.player = Math.floor(Math.random() * 2) + 1;
        console.log(this.player);
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
        console.log(playerTurn);
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
        console.log(playerTurn);
        checkWinner(board.boardArr, playerTurn, circleColumn, circleRow);
        turn.changePlayer();
        console.log(playerTurn);
    }
}

function checkWinner(boardArr, playerTurn ,circleColumn, circleRow) {
    console.log(playerTurn);
    if (
        checkHorizontal(boardArr, playerTurn, circleColumn, circleRow) ||
        checkVertical(boardArr, playerTurn, circleColumn, circleRow) ||
        checkDiagonal(boardArr, playerTurn, circleColumn, circleRow)
    ) {
        console.log(`Player ${playerTurn} wins!`);
    }
}
function checkVertical(boardArr, playerTurn, circleColumn, circleRow) {
    if (boardArr[circleRow][circleColumn] instanceof Circle) {
        const CircleType = playerTurn === 1 ? YellowCircle : RedCircle;
        for (let i = 0; i <= boardArr.length - 4; i++) {
            if (
                boardArr[i][circleColumn] instanceof CircleType &&
                boardArr[i + 1][circleColumn] instanceof CircleType &&
                boardArr[i + 2][circleColumn] instanceof CircleType &&
                boardArr[i + 3][circleColumn] instanceof CircleType
            ) {
                return true;
            }
        }
    }
    return false;
}

function checkHorizontal(boardArr, playerTurn, circleColumn, circleRow) {
    if (boardArr[circleRow][circleColumn] instanceof Circle) {
        const CircleType = playerTurn === 1 ? YellowCircle : RedCircle;
        for (let i = 0; i <= boardArr[circleRow].length - 4; i++) {
            if (
                boardArr[circleRow][i] instanceof CircleType &&
                boardArr[circleRow][i + 1] instanceof CircleType &&
                boardArr[circleRow][i + 2] instanceof CircleType &&
                boardArr[circleRow][i + 3] instanceof CircleType
            ) {
                return true;
            }
        }
    }
    return false;
}
function checkDiagonal(
    boardArr,
    playerTurn,
    circleColumn,
    circleRow
) {
    if (boardArr[circleRow][circleColumn] instanceof Circle) {
        const CircleType = playerTurn === 1 ? YellowCircle : RedCircle;
        for (let i = 0; i <= boardArr.length - 4; i++) {
            for (let j = 0; j <= boardArr[0].length - 4; j++) {
                if (
                    boardArr[i][j] instanceof CircleType &&
                    boardArr[i + 1][j + 1] instanceof CircleType &&
                    boardArr[i + 2][j + 2] instanceof CircleType &&
                    boardArr[i + 3][j + 3] instanceof CircleType
                ) {
                    return true;
                }
            }
        }
    }
    return false;
}

const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartButton');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill('');
let scores = { X: 0, O: 0 };
let lastWinner = null;

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function updateScores() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

function createBoard() {
    board.innerHTML = '';
    boardState = Array(9).fill('');
    gameActive = true;
    currentPlayer = lastWinner || 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleClick);
        board.appendChild(cell);
    }

    updateScores();
}

function handleClick(e) {
    const index = e.target.dataset.index;
    if (!gameActive || boardState[index]) return;

    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        highlightWinner(winner);
        scores[currentPlayer]++;
        lastWinner = currentPlayer;
        updateScores();
        gameActive = false;
    } else if (boardState.every((cell) => cell)) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    for (let combo of winCombos) {
        const [a, b, c] = combo;
        if (
            boardState[a] &&
            boardState[a] === boardState[b] &&
            boardState[a] === boardState[c]
        ) {
            return combo;
        }
    }
    return null;
}

function highlightWinner(combo) {
    combo.forEach((i) => {
        board.children[i].classList.add('winning');
    });
}

restartBtn.addEventListener('click', createBoard);

createBoard();

// mariam
let turn = document.getElementById('turn');
let player = 'X';

// omar
let xWins = 0;
let oWins = 0;
// omar - load wins from localStorage
if (localStorage.getItem('xWins')) {
    xWins = parseInt(localStorage.getItem('xWins'));
    document.getElementById('x').innerHTML = `X wins: ${xWins}`;
}
if (localStorage.getItem('oWins')) {
    oWins = parseInt(localStorage.getItem('oWins'));
    document.getElementById('o').innerHTML = `O wins: ${oWins}`;
}

turn.style.background = 'linear-gradient(270deg, #5ee7df, #b490ca)';
turn.style.color = 'black';

for (let i = 1; i < 10; i++) {
    let square = document.getElementById('square' + i);
    square.addEventListener('click', function () {
        play('square' + i);
    });
} //to make the play function work when clicking on the squares

//"Mariam"
// to update colors without refresh
function updateColors() {
    for (let i = 1; i < 10; i++) {
        let element = document.getElementById('square' + i);
        if (isDark) {
            element.style.background =
                'linear-gradient(135deg, #2d2d5a, #4a4a8a)';
            turn.style.color = 'black';
            turn.style.background = 'linear-gradient(270deg, #3c3c8a, #aa66cc)';
        } else {
            element.style.background =
                'linear-gradient(135deg, #c8c8e6, #82c8f9)';
            turn.style.color = 'black';
            turn.style.background = 'linear-gradient(270deg, #5ee7df, #b490ca)';
        }
        element.style.color = isDark ? '#ffffffff' : '#000000ff';
    }

    if (turn.innerHTML.includes('Winner')) {
        if (isDark) {
            turn.style.background = 'linear-gradient(270deg, #3c3c8a, #aa66cc)';
        } else {
            turn.style.background = 'linear-gradient(270deg, #6bc9e7, #ff99cc)';
        }
        turn.style.color = isDark ? 'white' : 'black';

        let winner = turn.innerHTML.includes('X') ? 'X' : 'O';

        for (let i = 1; i <= 9; i++) {
            let square = document.getElementById('square' + i);
            if (square.innerHTML === winner) {
                square.style.background = isDark
                    ? 'linear-gradient(270deg, #3c3c8a, #aa66cc)'
                    : 'linear-gradient(270deg, #6bc9e7, #ff99cc)';
                square.style.color = isDark ? '#ffffff' : '#000000';
            }
        }
    } else if (turn.innerHTML === 'Draw') {
        if (isDark) {
            turn.style.background = 'linear-gradient(270deg, #4e4e4e, #9e9e9e)';
        } else {
            turn.style.background = 'linear-gradient(270deg, #add8e6, #ffb6c1)';
        }
        turn.style.color = isDark ? 'white' : 'black';
        for (let i = 1; i <= 9; i++) {
            let square = document.getElementById('square' + i);
            square.style.background = isDark
                ? 'linear-gradient(135deg, #444, #666)'
                : 'linear-gradient(135deg, #f0f0f0, #ccc)';
            square.style.color = isDark ? '#ffcccb' : '#d63384';
        }
    } else {
        turn.style.background = 'linear-gradient(270deg, #5ee7df, #b490ca)';
        turn.style.color = isDark ? 'white' : 'black';
    }
}

// mariam
function refresh() {
    for (let i = 1; i < 10; i++) {
        let element = document.getElementById('square' + i);
        element.innerHTML = '';
        if (isDark) {
            element.style.background =
                'linear-gradient(135deg, #2d2d5a, #4a4a8a)';
        } else {
            element.style.background =
                'linear-gradient(135deg, #c8c8e6, #82c8f9)';
        }
        element.style.color = isDark ? '#ffffffff' : '#000000ff';
    }

    if (turn.innerHTML == 'X is the Winner') {
        turn.innerHTML = 'X turn';
        player = 'X';
    } else if (turn.innerHTML == 'O is the Winner') {
        turn.innerHTML = 'O turn';
        player = 'O';
    } else {
        turn.innerHTML = ` ${player} turn `;
    }

    // "omar" editting
    turn.style.background = isDark
        ? 'linear-gradient(270deg, #5ee7df, #b490ca)'
        : 'linear-gradient(270deg, #5ee7df, #b490ca)';
    turn.style.color = isDark ? 'white' : 'black';
    turn.style.boxShadow = 'none';
}

// omar
document.getElementById('restart').addEventListener('click', refresh);

// mariam
//to write X O in the squares
function play(id) {
    if (player === '') return;
    let write = document.getElementById(id);
    if (write.innerHTML == '' && player === 'X') {
        write.innerHTML = 'X';
        player = 'O';
        turn.innerHTML = 'O turn';
    } else if (write.innerHTML == '' && player === 'O') {
        write.innerHTML = 'O';
        player = 'X';
        turn.innerHTML = 'X turn';
    }
    check();
}

// omar
function check() {
    let board = [];
    for (let i = 0; i < 9; i++) {
        board[i] = document.getElementById('square' + (i + 1)).innerHTML;
    }

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            // used in color cells function "Mariam"
            highlightWinningSquares(a, b, c);
            declareWinner(board[a]);
            return;
        }
    }

    if (board.every((cell) => cell !== '')) {
        turn.innerHTML = 'Draw';
        if (isDark) {
            turn.style.background = 'linear-gradient(270deg, #4e4e4e, #9e9e9e)';
        } else {
            turn.style.background = 'linear-gradient(270deg, #add8e6, #ffb6c1)';
        }
        turn.style.color = isDark ? 'white' : 'black';
        turn.style.boxShadow = '#83d5f9ff 0px 2px 8px';
        // 'omar' changing the squares' colors when Draw
        for (let i = 1; i <= 9; i++) {
            let square = document.getElementById('square' + i);
            square.style.background = isDark
                ? 'linear-gradient(135deg, #444, #666)'
                : 'linear-gradient(135deg, #f0f0f0, #ccc)';
            square.style.color = isDark ? '#ffcccb' : '#d63384';
        }
    }
}
//to set the bg color for winner's cells "Mariam"
function highlightWinningSquares(a, b, c) {
    const winningColor = isDark
        ? 'linear-gradient(270deg, #3c3c8a, #aa66cc)'
        : 'linear-gradient(270deg, #6bc9e7, #ff99cc)';

    document.getElementById('square' + (a + 1)).style.background = winningColor;
    document.getElementById('square' + (b + 1)).style.background = winningColor;
    document.getElementById('square' + (c + 1)).style.background = winningColor;
}

//winner "Omar"
function declareWinner(winner) {
    turn.innerHTML = `${winner} is the Winner`;

    if (isDark) {
        turn.style.background = 'linear-gradient(270deg, #3c3c8a, #aa66cc)';
    } else {
        turn.style.background = 'linear-gradient(270deg, #6bc9e7, #ff99cc)';
    }
    turn.style.color = isDark ? 'white' : 'black';
    turn.style.boxShadow = '#83d5f9ff 0px 2px 8px';
    if (winner === 'X') {
        xWins++;
        document.getElementById('x').innerHTML = `X wins: ${xWins}`;
        localStorage.setItem('xWins', xWins); // omar - save to localStorage
    } else if (winner === 'O') {
        oWins++;
        document.getElementById('o').innerHTML = `O wins: ${oWins}`;
        localStorage.setItem('oWins', oWins); // omar - save to localStorage
    }
    player = '';
}

// 'Omar' added a toggle button for Boys-mode(Dark) & Girls-mode(Light)
const toggleBtn = document.getElementById('mode-toggle');
const themeLink = document.getElementById('theme-style');

let isDark = false;

toggleBtn.addEventListener('click', function () {
    if (isDark) {
        themeLink.href = 'main-light.css';
        toggleBtn.textContent = '🌙 Boys-mode';
        toggleBtn.style.background = 'linear-gradient(#3a3a79, #b490ca)';
    } else {
        themeLink.href = 'main-dark.css';
        toggleBtn.textContent = '☀️ Girls-mode';
        toggleBtn.style.background = 'linear-gradient(#1e1e3f, #3c4b57)';
    }
    isDark = !isDark;

    // 'mariam' to update colors without refreshing
    updateColors();
});

// 'Omar' added a reset score button
document.getElementById('reset-score').addEventListener('click', function () {
    xWins = 0;
    oWins = 0;
    localStorage.removeItem('xWins');
    localStorage.removeItem('oWins');
    document.getElementById('x').innerHTML = `X wins: ${xWins}`;
    document.getElementById('o').innerHTML = `O wins: ${oWins}`;
    refresh();
});

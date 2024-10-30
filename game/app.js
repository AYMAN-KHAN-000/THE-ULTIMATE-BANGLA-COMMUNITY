let isOTurn = true;
let isAutoPlayer = false;
const cells = document.querySelectorAll('.cell');
const gameBoard = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');
const oTurnIndicator = document.getElementById('o-turn');
const xTurnIndicator = document.getElementById('x-turn');
const multiplayerBtn = document.getElementById('multiplayer-btn');
const autoplayerBtn = document.getElementById('autoplayer-btn');

const checkWin = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return cells[a].textContent;
        }
    }
    return null;
};

const handleCellClick = (e) => {
    const cell = e.target;
    if (cell.textContent !== '') return;
    cell.textContent = isOTurn ? 'O' : 'X';
    const winner = checkWin();
    if (winner) {
        alert(`${winner} wins!`);
        resetGame();
        return;
    }
    isOTurn = !isOTurn;
    updateTurnIndicator();
    if (isAutoPlayer && !isOTurn) {
        setTimeout(autoPlay, 500);
    }
};

const resetGame = () => {
    cells.forEach(cell => cell.textContent = '');
    isOTurn = true;
    updateTurnIndicator();
};

const updateTurnIndicator = () => {
    if (isOTurn) {
        oTurnIndicator.style.backgroundColor = '#13563a';
        xTurnIndicator.style.backgroundColor = '';
    } else {
        xTurnIndicator.style.backgroundColor = '#13563a';
        oTurnIndicator.style.backgroundColor = '';
    }
};

const autoPlay = () => {
    const emptyCells = [...cells].filter(cell => cell.textContent === '');
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        emptyCells[randomIndex].textContent = 'X';
        const winner = checkWin();
        if (winner) {
            alert(`${winner} wins!`);
            resetGame();
            return;
        }
        isOTurn = !isOTurn;
        updateTurnIndicator();
    }
};

multiplayerBtn.addEventListener('click', () => {
    isAutoPlayer = false;
    resetGame();
});

autoplayerBtn.addEventListener('click', () => {
    isAutoPlayer = true;
    resetGame();
});

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', resetGame);
updateTurnIndicator();

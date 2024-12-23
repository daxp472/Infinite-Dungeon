let gameGrid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

function startGame() {
    resetGame();
    spawnNumber();
    spawnNumber();
}

function resetGame() {
    gameGrid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    score = 0;
    updateHighScore();
    updateGrid();
}

function spawnNumber() {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (gameGrid[i][j] === 0) {
                emptyCells.push([i, j]);
            }
        }
    }
    if (emptyCells.length > 0) {
        let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameGrid[randomCell[0]][randomCell[1]] = Math.random() < 0.9 ? 2 : 4;
        updateGrid();
    } else if (isGameOver()) {
        setTimeout(() => alert("Game Over!"), 100);
    }
}

function updateGrid() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let cell = document.getElementById(`cell-${i * 4 + j}`);
            let value = gameGrid[i][j];
            cell.textContent = value === 0 ? '' : value;
            cell.className = `tile ${value ? `tile-${value}` : ''}`;
        }
    }
    document.getElementById('score').textContent = `Score: ${score}`;
    updateHighScore();
}

function mergeRow(row) {
    row = row.filter(val => val); // Remove zeroes
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2; // Merge tiles
            score += row[i]; // Update score
            row[i + 1] = 0; // Remove merged tile
        }
    }
    // Refill row with zeroes
    return row.filter(val => val).concat(Array(4 - row.filter(val => val).length).fill(0));
}

function moveLeft() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        let originalRow = [...gameGrid[i]];
        gameGrid[i] = mergeRow(gameGrid[i]);
        if (!arraysEqual(originalRow, gameGrid[i])) moved = true;
    }
    if (moved) {
        spawnNumber();
    }
}

function moveRight() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        let originalRow = [...gameGrid[i]];
        gameGrid[i] = mergeRow(gameGrid[i].reverse()).reverse();
        if (!arraysEqual(originalRow, gameGrid[i])) moved = true;
    }
    if (moved) {
        spawnNumber();
    }
}

function moveUp() {
    let moved = false;
    for (let j = 0; j < 4; j++) {
        let column = [gameGrid[0][j], gameGrid[1][j], gameGrid[2][j], gameGrid[3][j]];
        let originalColumn = [...column];
        column = mergeRow(column);
        for (let i = 0; i < 4; i++) {
            gameGrid[i][j] = column[i];
        }
        if (!arraysEqual(originalColumn, column)) moved = true;
    }
    if (moved) {
        spawnNumber();
    }
}

function moveDown() {
    let moved = false;
    for (let j = 0; j < 4; j++) {
        let column = [gameGrid[3][j], gameGrid[2][j], gameGrid[1][j], gameGrid[0][j]];
        let originalColumn = [...column];
        column = mergeRow(column).reverse();
        for (let i = 0; i < 4; i++) {
            gameGrid[i][j] = column[i];
        }
        if (!arraysEqual(originalColumn, column)) moved = true;
    }
    if (moved) {
        spawnNumber();
    }
}

function isGameOver() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (gameGrid[i][j] === 0) return false;
            if (j < 3 && gameGrid[i][j] === gameGrid[i][j + 1]) return false;
            if (i < 3 && gameGrid[i][j] === gameGrid[i + 1][j]) return false;
        }
    }
    return true;
}

function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }
    document.getElementById('high-score').textContent = `High Score: ${highScore}`;
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }
});

// Initialize the game
startGame();

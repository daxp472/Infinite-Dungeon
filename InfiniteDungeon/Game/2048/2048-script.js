let gameGrid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
let score = 0;

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
    document.getElementById('score').textContent = `Score: ${score}`;
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
}

function mergeRow(row) {
    row = row.filter(val => val);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            score += row[i];
            row[i + 1] = 0;
        }
    }
    return row.filter(val => val).concat(Array(4 - row.filter(val => val).length).fill(0));
}

function moveLeft() {
    for (let i = 0; i < 4; i++) {
        gameGrid[i] = mergeRow(gameGrid[i]);
    }
    spawnNumber();
}

function moveRight() {
    for (let i = 0; i < 4; i++) {
        gameGrid[i] = mergeRow(gameGrid[i].reverse()).reverse();
    }
    spawnNumber();
}

function moveUp() {
    for (let j = 0; j < 4; j++) {
        let column = [gameGrid[0][j], gameGrid[1][j], gameGrid[2][j], gameGrid[3][j]];
        column = mergeRow(column);
        for (let i = 0; i < 4; i++) {
            gameGrid[i][j] = column[i];
        }
    }
    spawnNumber();
}

function moveDown() {
    for (let j = 0; j < 4; j++) {
        let column = [gameGrid[3][j], gameGrid[2][j], gameGrid[1][j], gameGrid[0][j]];

        column = mergeRow(column).reverse();
        for (let i = 0; i < 4; i++) {
            gameGrid[i][j] = column[i];
        }
    }

    spawnNumber();
    updateGrid();
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

startGame();

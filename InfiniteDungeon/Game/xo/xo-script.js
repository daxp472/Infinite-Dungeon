const cells = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('game-board');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restart-button');
const playVsAI = document.getElementById('play-vs-ai');
const playMultiplayer = document.getElementById('play-multiplayer');
const modeSelection = document.getElementById('mode-selection');

let currentPlayer = 'x';
let gameActive = true;
let isAI = false;
let board = Array(9).fill(null);

// Winning Combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Start Game
function startGame() {
  cells.forEach((cell, index) => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
    cell.addEventListener('click', () => handleCellClick(index), { once: true });
  });
  currentPlayer = 'x';
  gameActive = true;
  board = Array(9).fill(null);
  winnerMessage.textContent = '';
  winnerMessage.parentElement.classList.add('hidden');
}

// Handle Cell Click
function handleCellClick(index) {
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  cells[index].classList.add(currentPlayer);
  cells[index].textContent = currentPlayer.toUpperCase();

  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (board.every(cell => cell)) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';

    if (isAI && currentPlayer === 'o') {
      setTimeout(aiMove, 500); // AI takes its turn
    }
  }
}

// AI Logic
function aiMove() {
  // Find the first empty cell (simple AI)
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = 'o';
      cells[i].classList.add('o');
      cells[i].textContent = 'O';
      if (checkWin('o')) {
        endGame(false);
      } else if (board.every(cell => cell)) {
        endGame(true);
      } else {
        currentPlayer = 'x';
      }
      break;
    }
  }
}

// Check Win
function checkWin(player) {
  return winningCombinations.some(combination =>
    combination.every(index => board[index] === player)
  );
}

// End Game
function endGame(draw) {
  gameActive = false;
  winnerMessage.parentElement.classList.remove('hidden');
  if (draw) {
    winnerMessage.textContent = "It's a Draw!";
  } else {
    winnerMessage.textContent = `${currentPlayer.toUpperCase()} Wins!`;
  }
}

// Choose Game Mode
playVsAI.addEventListener('click', () => {
  isAI = true;
  modeSelection.classList.add('hidden');
  gameBoard.classList.remove('hidden');
  startGame();
});

playMultiplayer.addEventListener('click', () => {
  isAI = false;
  modeSelection.classList.add('hidden');
  gameBoard.classList.remove('hidden');
  startGame();
});

// Restart Game
restartButton.addEventListener('click', startGame);

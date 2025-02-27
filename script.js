const cells = document.querySelectorAll('.cell');
const messageText = document.getElementById('messageText');
const resetBtn = document.getElementById('resetBtn');
let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-index');
  
  if (board[index] !== '' || !gameActive) {
    return;
  }
  
  updateCell(cell, index);
  checkResult();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  const span = document.createElement('span');
  span.textContent = currentPlayer;
  cell.appendChild(span);
}

function checkResult() {
  let roundWon = false;
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] === '' || board[b] === '' || board[c] === '') {
      continue;
    }
    if (board[a] === board[b] && board[b] === board[c]) {
      roundWon = true;
      break;
    }
  }
  
  if (roundWon) {
    messageText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    highlightWinningCells();
    return;
  }
  
  if (!board.includes('')) {
    messageText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }
  
  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  messageText.textContent = `Player ${currentPlayer}'s turn`;
}

function highlightWinningCells() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      document.querySelector(`.cell[data-index="${a}"]`).classList.add('winner');
      document.querySelector(`.cell[data-index="${b}"]`).classList.add('winner');
      document.querySelector(`.cell[data-index="${c}"]`).classList.add('winner');
    }
  }
}

function resetGame() {
  board = Array(9).fill('');
  gameActive = true;
  currentPlayer = 'X';
  messageText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.innerHTML = '';
    cell.classList.remove('winner');
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

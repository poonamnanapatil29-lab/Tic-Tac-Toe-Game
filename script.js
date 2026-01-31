const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let mode = "pvp";

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function setMode(selectedMode) {
  mode = selectedMode;
  resetGame();
  gameActive = true;
  statusText.innerText = `Player ${currentPlayer}'s Turn`;
}

cells.forEach(cell => {
  cell.addEventListener("click", () => handleClick(cell));
});

function handleClick(cell) {
  const index = cell.dataset.index;

  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  cell.innerText = currentPlayer;

  if (checkWin()) {
    statusText.innerText = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.innerText = "😐 It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.innerText = `Player ${currentPlayer}'s Turn`;

  if (mode === "cpu" && currentPlayer === "O") {
    setTimeout(cpuMove, 500);
  }
}

function cpuMove() {
  let emptyCells = board
    .map((v, i) => v === "" ? i : null)
    .filter(v => v !== null);

  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  cells[randomIndex].click();
}

function checkWin() {
  return winPatterns.some(pattern =>
    pattern.every(i => board[i] === currentPlayer)
  );
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.innerText = "");
  currentPlayer = "X";
  gameActive = false;
  statusText.innerText = "Choose Mode to Start";
}

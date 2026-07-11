const GameBoard = (function () {
  let board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => [...board];

  const resetBoard = () => (board = Array(9).fill(''));

  const placeMarker = (index, marker) => {
    if (!isCellEmpty(index)) return false;

    board[index] = marker;
    return true;
  };

  const isCellEmpty = (index) => {
    return board[index] === '';
  };

  return { getBoard, resetBoard, placeMarker, isCellEmpty };
})();

function Player(name, marker) {
  return { name, marker };
}

const GameController = (function () {
  const player1 = Player('Player-1', 'X');
  const player2 = Player('Player-2', 'O');

  let currentPlayer = player1;
  let gameOver = false;
      const winnerText = document.querySelector('.winner');

  const playRound = (index) => {
    if (gameOver) return;
    const success = GameBoard.placeMarker(index, currentPlayer.marker);
if(!success) return
    if (checkWinner(currentPlayer)) {
      winnerText.textContent = `${currentPlayer.name}: with Marker:'${currentPlayer.marker}' is the winner!`;

      gameOver = true;
      return;
    }
    if (checkTie()) {      
      winnerText.textContent = `Game is Tie, Try Again!`;
      gameOver = true;
      return;
    }

    switchPlayer();
  };

  const switchPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const checkWinner = (currentPlayer) => {
    const board = GameBoard.getBoard();

    const winningPattern = [
      // Horizontal pattern
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      // Vertical pattern
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      // diagonal pattern
      [0, 4, 8],
      [6, 4, 2],
    ];

    return winningPattern.some((pattern) =>
      pattern.every((index) => board[index] === currentPlayer.marker),
    );
  };

  const checkTie = () => {
    const board = GameBoard.getBoard();

    return board.every((cell) => cell !== '' && checkWinner);
  };

  const restartGame = () => {
    GameBoard.resetBoard();

    currentPlayer = player1;

    gameOver = false;
  }

  return {
    playRound,
    switchPlayer,
    checkWinner,
    checkTie,
    restartGame,
  };
})();

const DisplayController = (function () {
  const cells = document.querySelectorAll('.cell');
  const cellsArray = Array.from(cells);
  const restartBtn = document.querySelector('.restart-btn');
      const winnerText = document.querySelector('.winner');

  
  const renderBoard = () => {
    const board = GameBoard.getBoard();

    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };

  cells.forEach((cell) => {
    cell.addEventListener('click', function (event) {
      const index = cellsArray.indexOf(event.target);

      GameController.playRound(index);
      renderBoard();
    });
  });

  restartBtn.addEventListener('click', function() {
    GameController.restartGame();
    renderBoard();
    winnerText.textContent = '';
  })

  return {
    renderBoard,
  };
})();

DisplayController.renderBoard()
const GameBoard = (function () {
  let board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => [...board];

  const resetBoard = () => (board = Array(9).fill(''));

  const placeMarker = (index, marker) => {
    if (board[index] !== '') return false;
    board[index] = marker;
    return true;
  };

  return {
    getBoard,
    resetBoard,
    placeMarker,
  };
})();

function Player(name, marker) {
  return { name, marker };
}

const GameController = (function () {
  const player1 = Player('Player-1', 'X');
  const player2 = Player('Player-2', 'O');

  let currentPlayer = player1;
  let gameOver = false;

  const playRound = (index) => {
    if (gameOver) return;

    const success = GameBoard.placeMarker(index, currentPlayer.marker);
    if (!success) return;

    if (checkWinner()) {
      gameOver = true;
      return { winner: currentPlayer, tie: false, gameOver: true };
    }

    if (checkTie()) {
      gameOver = true;

      return { winner: null, tie: true, gameOver: true };
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;

    return {
      winner: null,
      tie: false,
      gameOver: false,
      nextPlayer: currentPlayer,
    };
  };

  const checkWinner = () => {
    const board = GameBoard.getBoard();
    const winningPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      //  horizontal Pattern ^
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Vertical Pattern ^
      [0, 4, 8],
      [6, 4, 2],
      // Diagonal Patten
    ];
    return winningPattern.some((pattern) =>
      pattern.every(
        (index) => board[index] !== '' && board[index] === currentPlayer.marker,
      ),
    );
  };

  const checkTie = () => {
    return GameBoard.getBoard().every((cell) => cell !== '');
  };

  const restartGame = () => {
    GameBoard.resetBoard();
    currentPlayer = player1;
    gameOver = false;
  };

  return { 
    playRound,
    restartGame, 
    getCurrentPlayer: () => currentPlayer
   };

})();

const DisplayController = (function () {

  const cells = document.querySelectorAll('.cell');
  const restartBtn = document.querySelector('.restart-btn');
  const winnerText = document.querySelector('.winner');

  const renderBoard = (result) => {

    const board = GameBoard.getBoard();
    cells.forEach((cell, index) => {
      cell.textContent = board[index];

    });

    if (result && result.gameOver) {
      if (result.tie) winnerText.textContent = 'Game is Tie!';
      else
        winnerText.textContent = `${result.winner.name}('${result.winner.marker}') wins!`;
    } else {
      winnerText.textContent = '';
    }
  };

  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      const result = GameController.playRound(index);
      if (result) renderBoard(result);
    });
  });

  restartBtn.addEventListener('click', () => {
    GameController.restartGame();
    renderBoard();

  });
  
})();

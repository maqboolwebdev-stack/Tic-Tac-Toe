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

  const playRound = (index) => {
    
    if(gameOver) return;
    GameBoard.placeMarker(index, currentPlayer.marker);



    
    if(checkWinner(currentPlayer)){
      console.log(`${currentPlayer.name} Marker: '${currentPlayer.marker}' is the winner!`);
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


return winningPattern.some( pattern =>
  pattern.every(index => board[index] === currentPlayer.marker)
)

  };

  const checkTie = () => {};

  return {
    player1,
    player2,
    currentPlayer,
    playRound,
    switchPlayer,
    checkWinner,
    checkTie,
  };
})();

GameController.playRound(0); // X
GameController.playRound(3); //O
GameController.playRound(1); // X

GameController.playRound(5); //O
GameController.playRound(2); // X
GameController.playRound(4); // O  This will not work
GameController.playRound(4); // X This will not work

// GameBoard.resetBoard();


console.log(GameBoard.getBoard());



const GameBoard = (function () {
  let board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => [...board];

  const resetBoard = () => (board = Array(9).fill(''));

  const placeMarker = (index, marker) => {
    if(isCellEmpty(index)) {
      board[index] = marker;
    } 
  };

  const isCellEmpty = (index) => {
     return board[index] === '';
  };

  return { getBoard, resetBoard, placeMarker, isCellEmpty };

})();

function Player(name, marker) {
  return { name, marker };
}


  GameBoard.placeMarker(0,'O');
  GameBoard.placeMarker(1,'X'); 
  GameBoard.placeMarker(2,'O'); 
  GameBoard.placeMarker(5,'X'); 
  GameBoard.placeMarker(8,'O'); 
  GameBoard.placeMarker(1,'O'); // This  will not apply

console.log(GameBoard.getBoard());
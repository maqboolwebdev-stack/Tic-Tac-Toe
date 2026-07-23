const player1Input = document.querySelector('#player1');
const player2Input = document.querySelector('#player2');
const startBtn = document.querySelector('.start-btn');

function getPlayerNames() {
  return {
    player1Name: player1Input.value.trim().toUpperCase(),
    player2Name: player2Input.value.trim().toUpperCase(),
  };
}

export { startBtn, getPlayerNames};


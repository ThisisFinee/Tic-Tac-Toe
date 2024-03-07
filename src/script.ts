
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
const restartButton = document.getElementById('Restart');
const switchButton = document.getElementById('switchButton');

switchButton.addEventListener('click', switchClick)

restartButton.addEventListener('click', restartClick);

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
    const cell = e.target;
    placeMark(cell, currentPlayer);
    if (checkWin(currentPlayer) && switchButton.textContent ==='Player') {
        alert(`${currentPlayer} wins!`);
        restartLocation();
    } else if (checkWin(currentPlayer) && switchButton.textContent ==='Computer'){  
        alert('Player wins!');
        restartLocation();
    } else if (checkDraw()) {
        alert('It\'s a draw!');
        restartLocation();
    } else {
      if (switchButton.textContent === 'Player'){
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';}
      else if (switchButton.textContent === 'Computer') {
        
        computerTurn(currentPlayer);
    }
}}

function placeMark(cell, player) {
    cell.classList.add(player);
    cell.textContent = player;
}

function checkWin(player) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination =>
        combination.every(index => cells[index].classList.contains(player))
    );
}

function checkDraw() {
    return [...cells].every(cell => cell.classList.contains('X') || cell.classList.contains('O'));
}

function restartLocation() {
  cells.forEach(cell => {
    cell.textContent = " ";
    if (cell.classList.contains('X'))
      {cell.classList.remove('X');}
    else if (cell.classList.contains('O'))
      {cell.classList.remove('O');}
   cell.addEventListener('click', handleClick, { once: true });
  });            
}

function restartClick(e){
  restartLocation();
}

function switchClick(e){
  restartLocation();
  if (switchButton.textContent === 'Player') {
            switchButton.textContent = 'Computer';
        } else {
            switchButton.textContent = 'Player';
        }
}

function computerTurn(currentPlayer) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const availableCells = [...cells].filter(cell => !cell.classList.contains('X') && !cell.classList.contains('O'));
  
  const winningMove = findWinningMove(currentPlayer);
    const blockingMove = findBlockingMove(currentPlayer);

    if (winningMove) {
        placeMark(winningMove, currentPlayer);
    } else if (blockingMove) {
        placeMark(blockingMove, currentPlayer);
    } else if (availableCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const cell = availableCells[randomIndex];
        placeMark(cell, currentPlayer);
    }
  
    if (checkWin(currentPlayer)) {
        alert(`Computer wins!`);
        restartLocation(currentPlayer);
    } else if (checkDraw()) {
        alert('It\'s a draw!');
        restartLocation(currentPlayer);
    }
}

function findWinningMove(player) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
      const availableCombinations = combination.filter(index => cells[index].classList.contains(`${player}`))
      if (availableCombinations.length === 2){
        const availableCells = combination.filter(index => !cells[index].classList.contains('X') && !cells[index].classList.contains('O'));
        if (availableCells.length === 1) {
            return cells[availableCells[0]];
        }
      }
    }
}

function findBlockingMove(player) {
    const opponent = player === 'X' ? 'O' : 'X';
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
      const availableCombinations = combination.filter(index => cells[index].classList.contains(`${opponent}`))
      if (availableCombinations.length === 2){
        const availableCells = combination.filter(index => !cells[index].classList.contains('X') && !cells[index].classList.contains('O'));
        if (availableCells.length === 1) {
            return cells[availableCells[0]];
        }
      }
    }
}

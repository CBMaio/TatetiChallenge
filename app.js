const cells = document.querySelectorAll(".cell-table");
let game = 0;
let win = false;
let gamer1 = "X";
let gamer2 = "0";
let result = document.getElementById("result");

const gameWin = () => {
  if (game % 2 !== 0) {
    result.innerHTML = `Ganó ${gamer1}`;
    result.classList.add("win-letter");
  } else {
    result.innerHTML = `Ganó ${gamer2}`;
    result.classList.add("win-letter");
  }

  win = true;
  return win;
};

const selectCell = (cell) => {
  if (cell.innerHTML === "" && !win) {
    if (game % 2 !== 0) {
      cell.innerHTML = "X";
      cell.value = "X";
      result.innerHTML = `Turno de ${gamer2}`;
    } else {
      cell.innerHTML = "O";
      cell.value = "O";
      result.innerHTML = `Turno de ${gamer1}`;
    }

    cell.classList.add("table-selected");
    validation();
    empate();
    game++;
  }
};

const empate = () => {
  if (game === 9) {
   setTimeout(() => {
    result.innerHTML = `¡Empate! Vuelve a intentarlo`;
    result.classList.add('lose-letter');
   }, 200)
  }
};

const validation = () => {
  //HORIZONTAL
  if (cells[0].value === cells[1].value && cells[0].value === cells[2].value) {
    gameWin();
  } else if (
    cells[3].value === cells[4].value &&
    cells[3].value === cells[5].value
  ) {
    gameWin();
  } else if (
    cells[6].value === cells[7].value &&
    cells[6].value === cells[8].value
  ) {
    gameWin();
  }

  //VERTICAL

  if (cells[0].value === cells[3].value && cells[0].value === cells[6].value) {
    gameWin();
  } else if (
    cells[1].value === cells[4].value &&
    cells[1].value === cells[7].value
  ) {
    gameWin();
  } else if (
    cells[2].value === cells[5].value &&
    cells[2].value === cells[8].value
  ) {
    gameWin();
  }

  //DIAGONAL

  if (cells[0].value === cells[4].value && cells[0].value === cells[8].value) {
    gameWin();
  } else if (
    cells[2].value === cells[4].value &&
    cells[2].value === cells[6].value
  ) {
    gameWin();
  }
};

const play = () => {
  game++;
  result.innerHTML = `Turno de ${gamer1}`;
  for (const cell of cells) {
    cell.classList.remove("table-selected");
    cell.innerHTML = "";
    cell.value = cell.id;
    cell.addEventListener("click", () => selectCell(cell));
    if (win) {
      return;
    }
  }
};

const resetGame = () => {
  document.getElementById("result").innerHTML = "";
  win = false;
  result.classList.remove("win-letter");
  result.classList.remove('lose-letter');
  game = 0;
  play();
};

play();

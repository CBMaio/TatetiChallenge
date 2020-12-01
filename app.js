const cells = document.querySelectorAll(".cell-table");
let game = 0;
let win = false;
let nameG1 = document.getElementById("gamer-1");
let nameG2 = document.getElementById("gamer-2");
let result = document.getElementById("result");

const gameWin = (cell1, cell2, cell3) => {
  result.classList.add("win-letter");
  result.innerHTML = `Ganó ${
    game % 2 !== 0 ? nameG1.value || "Jugador 1" : nameG2.value || "Jugador 2"
  }`;
  for (cell of cells) {
    cell.classList.add("table-selected");
  }

  cell1.classList.add('bg-color-cell');
  cell1.classList.remove('table-selected')
  cell2.classList.add('bg-color-cell');
  cell2.classList.remove('table-selected')
  cell3.classList.add('bg-color-cell');
  cell3.classList.remove('table-selected')
  win = true;
  return win;
};

  const selectCell = (cell) => {
  if (cell.innerHTML === "" && !win) {
    if (game % 2 !== 0) {
      cell.innerHTML = "X";
      cell.value = "X";
      result.innerHTML = `Turno de ${nameG2.value || "Jugador 2"}`;
    } else {
      cell.innerHTML = "O";
      cell.value = "O";
      result.innerHTML = `Turno de ${nameG1.value || "Jugador 1"}`;
    }

    cell.classList.add("table-selected");
    validation();
    empate();
    game++;
  }
};

const empate = () => {
  if (game === 9 && !win) {
    result.innerHTML = "Estamos evaluando su partida... 🤓";
    setTimeout(() => {
      result.innerHTML = `¡Empate! 😜 Vuelve a intentarlo `;
      result.classList.add("lose-letter");
    }, 1000);
  }
};

const validation = () => {
  //HORIZONTAL
  if (cells[0].value === cells[1].value && cells[0].value === cells[2].value) {
    gameWin(cells[0],cells[1], cells[2]);
  } else if (
    cells[3].value === cells[4].value &&
    cells[3].value === cells[5].value
  ) {
    gameWin(cells[3], cells[4], cells[5]);
  } else if (
    cells[6].value === cells[7].value &&
    cells[6].value === cells[8].value
  ) {
    gameWin(cells[6], cells[7], cells[8]);
  }

  //VERTICAL

  if (cells[0].value === cells[3].value && cells[0].value === cells[6].value) {
    gameWin(cells[0], cells[3], cells[6]);
  } else if (
    cells[1].value === cells[4].value &&
    cells[1].value === cells[7].value
  ) {
    gameWin(cells[1], cells[4], cells[7]);
  } else if (
    cells[2].value === cells[5].value &&
    cells[2].value === cells[8].value
  ) {
    gameWin(cells[2], cells[5], cells[8]);
  }

  //DIAGONAL

  if (cells[0].value === cells[4].value && cells[0].value === cells[8].value) {
    gameWin(cells[0], cells[4], cells[8]);
  } else if (
    cells[2].value === cells[4].value &&
    cells[2].value === cells[6].value
  ) {
    gameWin(cells[2], cells[4], cells[6]);
  }
};

const startGame = () => {
  game = 0;
  document.getElementById("section-game").classList.remove("hidden");
  document.getElementById("section-names").classList.add("hidden");
  document.getElementById("description-game").innerHTML = `${
    nameG1.value || "Jugador 1"
  } Jugarás con la X. \n ${nameG2.value || "Jugador 2"} serás la O!`;
  play();
};

const newGamers = () => {
  document.getElementById("section-game").classList.add("hidden");
  document.getElementById("section-names").classList.remove("hidden");
  nameG1.value = '';
  nameG2.value = '';

  resetGame();
};

const play = () => {
  game++;
  result.innerHTML = `Arranca ${nameG1.value || "Jugador 1"}`;
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
  win = false;
  game = 0;
  result.classList.remove("win-letter");
  result.classList.remove("lose-letter");
  play();
};

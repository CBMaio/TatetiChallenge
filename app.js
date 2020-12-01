const cells = document.querySelectorAll(".cell-table");
let game = 0;
let win = false;
let nameG1 = document.getElementById("gamer-1");
let nameG2 = document.getElementById("gamer-2");
let result = document.getElementById("result");

const gameWin = () => {
  result.classList.add("win-letter");
  result.innerHTML = `Ganó ${
    game % 2 !== 0 ? nameG1.value || "Jugador 1" : nameG2.value || "Jugador 2"
  }`;
  for (cell of cells) {
    cell.classList.add("table-selected");
  }
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

const startGame = () => {
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
  result.classList.remove("win-letter");
  result.classList.remove("lose-letter");
  game = 0;
  play();
};

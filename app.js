let gameBoardHtml = document.querySelector(".game");
let cellsHtml;
let aliveCell;
let attackCell;
let cellstoBeDead;
let size = 21;
let rowStartPosition = Math.floor(Math.random() * (size - 1)) + 1;
let cellStartPosition = Math.floor(Math.random() * (size - 1)) + 1;
let arry = [];
let attackCellArray = [
  [1, 1],
  [2, 9],
  [6, 2],
  [8, 8],
  [10, 0],
  [4, 9],
  [4, 2],
  [0, 11],
  [1, 1],
  [10, 9],
  [11, 2],
  [13, 3],
  [12, 20],
  [17, 18],
  [16, 10],
  [20, 11],
];
let cellToBeAttack = [];
let cellsArray;
const positionOfCell = () => {
  for (let i = 1; i <= size; i++) {
    for (let j = 1; j <= size; j++) {
      arry.push([i, j]);
    }
  }
  console.log(arry);
};

const createBoard = (rows, columns) => {
  const boardHtml = document.createElement("div");
  boardHtml.classList.add("board");
  for (let i = 0; i <= rows; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j <= columns; j++) {
      const cell = document.createElement("div");
      cell.setAttribute("data-row", i);
      cell.setAttribute("data-cell", j);
      // cell.innerText = `${i} ${j} `;
      cell.classList.add("dead");
      row.appendChild(cell);
    }
    boardHtml.appendChild(row);
  }
  gameBoardHtml.appendChild(boardHtml);
  cellsHtml = document.querySelectorAll(".dead");
  positionOfCell();
  RandomCellAlive();
  RandomCellAttack();
  moveAttackCell();
};

const RandomCellAlive = () => {
  aliveCell = document.querySelector(
    `[data-row="${rowStartPosition}"][data-cell="${cellStartPosition}"]`
  );
  aliveCell.classList.replace("dead", "alive");

  // let test = [rowStartPosition, cellStartPosition];
  // const newArray = arry.filter(
  //   (subarray) => JSON.stringify(subarray) !== JSON.stringify(test)
  // );
  // arry.forEach((element) => {
  //   if (element === [5, 5]) {
  //     console.log(element);
  //     arry.shift(element);
  //   }
  // });
  // console.log("new array", newArray);
};

const RandomCellAttack = () => {
  for (let i = 0; i < attackCellArray.length; i++) {
    attackCell = document.querySelector(
      `[data-row="${attackCellArray[i][0]}"][data-cell="${attackCellArray[i][1]}"]`
    );
    attackCell.classList.replace("dead", "attack");
  }
};

const moveCell = (e) => {
  let rowCurrentPostion = rowStartPosition;
  let cellCurrentPosition = cellStartPosition;
  if (
    e.code === "ArrowLeft" ||
    e.code === "ArrowUp" ||
    e.code === "ArrowRight" ||
    e.code === "ArrowDown"
  ) {
    if (e.code === "ArrowLeft") {
      cellCurrentPosition -= 1;
    } else if (e.code === "ArrowUp") {
      rowCurrentPostion -= 1;
    } else if (e.code === "ArrowRight") {
      cellCurrentPosition += 1;
    } else if (e.code === "ArrowDown") {
      rowCurrentPostion += 1;
    }
  }
  if (
    document.querySelector(
      `[data-row="${rowCurrentPostion}"][data-cell="${cellCurrentPosition}"]`
    )
  ) {
    cellstoBeDead = aliveCell;
    cellstoBeDead.classList.replace("alive", "dead");
    rowStartPosition = rowCurrentPostion;
    cellStartPosition = cellCurrentPosition;
    aliveCell = document.querySelector(
      `[data-row="${rowStartPosition}"][data-cell="${cellStartPosition}"]`
    );
    aliveCell.classList.replace("dead", "alive");
  }
};

const moveAttackCell = () => {
  let cellsArray = [...cellsHtml];
  console.log(cellsArray);
  let newArray = [];
  let currentRow = [];
  cellToBeAttack = [];
  for (let i = 0; i < cellsArray.length; i++) {
    currentRow.push([
      cellsArray[i].dataset.row,
      cellsArray[i].dataset.cell,
      cellsArray[i].classList.value,
    ]);
    if (currentRow.length === parseInt(size + 1)) {
      newArray.push(currentRow);
      currentRow = [];
    }
  }
  console.log(newArray);
  console.log(
    "sprawdzanie mozliwe komiarki obok dla tablicy attackCellArray",
    attackCellArray
  );
  attackCellArray.forEach((element) => {
    let i = element[0];
    let j = element[1];
    const directions = [
      { row: i - 1, cell: j - 1 },
      { row: i - 1, cell: j },
      { row: i - 1, cell: j + 1 },
      { row: i, cell: j - 1 },
      { row: i, cell: j + 1 },
      { row: i + 1, cell: j - 1 },
      { row: i + 1, cell: j },
      { row: i + 1, cell: j + 1 },
    ];
    let test = [];

    console.log(element);
    directions.forEach((direction) => {
      const { row, cell } = direction;
      if (
        row >= 0 &&
        row < newArray.length &&
        cell >= 0 &&
        cell < newArray[row].length &&
        newArray[row][cell][2] != "attack"
      ) {
        let xxx = newArray[row][cell];
        test.push([parseInt(xxx[0]), parseInt(xxx[1])]);
        console.log("+moga byc aktywowane", direction);
        // console.log("żyjąca komórka", newArray[row][cell]);
      } else {
        console.log("-nie moga byc aktywowane", direction);
      }
      // if (test.length === 0) {
      //   console.log("pusta tablica dla elementu", element);
      // }
    });

    if (test.length > 0) {
      console.log("test", test);
      cellToBeAttack.push(test);
    }

    test = [];
  });
  console.log("tablice mozliwosc dla daneych komórek", cellToBeAttack);
};

const changeattackcell = () => {
  attackCellArray = [];
  console.log(
    "sprawdzanie w changeataccl tablicy celltobeattack",
    cellToBeAttack
  );
  cellToBeAttack.forEach((element) => {
    // console.log("elemenet!!!!!!!!!", element);
    let currentElement = element[Math.floor(Math.random() * element.length)];
    // console.log("current element", currentElement);
    attackCellArray.push([currentElement[0], currentElement[1]]);
  });
  console.log("komorki atakuje do zmiany", attackCellArray);
  RandomCellAttack();
  moveAttackCell();
};

// setInterval(changeattackcell, 2000);
// setTimeout(changeattackcell, 10000);
// setTimeout(changeattackcell, 10000);
createBoard(size, size);
setInterval(changeattackcell, 1000);

document.addEventListener("keydown", moveCell);

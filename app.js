let gameBoardHtml = document.querySelector(".game");
let cellsHtml;
let aliveCell;
let attackCell;
let cellstoBeDead;
let size = 10;
// let rowStartPosition = Math.floor(Math.random() * (size - 1)) + 1;
// let cellStartPosition = Math.floor(Math.random() * (size - 1)) + 1;
let rowStartPosition = 5;
let cellStartPosition = 5;
let arry = [];

// const positionOfCell = () => {
//   for (let i = 1; i <= size; i++) {
//     for (let j = 1; j <= size; j++) {
//       arry.push([i, j]);
//     }
//   }
//   console.log(arry);
// };

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
      cell.innerText = `${i} ${j} `;
      cell.classList.add("dead");
      row.appendChild(cell);
    }
    boardHtml.appendChild(row);
  }
  gameBoardHtml.appendChild(boardHtml);
  // positionOfCell();
  RandomCellAlive();
  RandomCellAttack();
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
  const attackCellArray = [
    [1, 1],
    [2, 9],
    [6, 2],
    [8, 8],
  ];
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

createBoard(size, size);
document.addEventListener("keydown", moveCell);

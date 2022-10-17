const player1El = document.querySelector("#p-1");
const player2El = document.querySelector("#p-2");
const btnEl = document.querySelectorAll(".btn");
const scoreP1El = document.querySelectorAll(".score")[0];
const scoreTieEl = document.querySelectorAll(".score")[1];
const scoreP2El = document.querySelectorAll(".score")[2];

const displyContainerEl = document.querySelector(".displayMassegeContainer");
const winnerEl = document.querySelector(".winner");

const btnRulesEl = document.querySelector(".btn--rules");
const rulesContainerEl = document.querySelector(".rules--container");
const btnRulesCloseEl = document.querySelector(".close");

const btnPlayAgainEl = document.querySelector(".btn--playAgain");
const justBtn = document.querySelectorAll(".btn");

function displayWinner(playerNo, symble) {
  displyContainerEl.classList.remove("d--none");
  winnerEl.innerHTML = `Player ${playerNo} (${symble}) Won The Game!!`;
}
function showtieresult() {
  displyContainerEl.classList.remove("d--none");
  winnerEl.innerHTML = ` No One Won The Game!!`;
}

let gameArray;
let activep1;
let activep2;
let numberOfEntries;
function reset() {
  activep1 = true;
  activep2 = false;
  numberOfEntries = 0;
  gameArray = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ];
  displyContainerEl.classList.add("d--none");
  rulesContainerEl.classList.add("d--none");
  justBtn.forEach((ele) => {
    ele.textContent = "";
    ele.disabled = false;
  });
}
reset();

let player1Win = 0;
let player2Win = 0;
let tieCount = 0;

function gameLogic(p) {
  if (
    (gameArray[0][0] == p && gameArray[0][1] == p && gameArray[0][2] == p) ||
    (gameArray[1][0] == p && gameArray[1][1] == p && gameArray[1][2] == p) ||
    (gameArray[2][0] == p && gameArray[2][1] == p && gameArray[2][2] == p) ||
    (gameArray[0][0] == p && gameArray[1][0] == p && gameArray[2][0] == p) ||
    (gameArray[0][1] == p && gameArray[1][1] == p && gameArray[2][1] == p) ||
    (gameArray[0][2] == p && gameArray[1][2] == p && gameArray[2][2] == p) ||
    (gameArray[0][0] == p && gameArray[1][1] == p && gameArray[2][2] == p) ||
    (gameArray[0][2] == p && gameArray[1][1] == p && gameArray[2][0] == p)
  ) {
    return true;
  }
  return false;
}

function fun(ele) {
  ele.disabled = true;
  numberOfEntries++;
  // console.log(ele.id.split("-"));
  gameArray[ele.id.split("-")[0]][ele.id.split("-")[1]] = activep1 ? "O" : "X";
  // console.log(gameArray);
  if (activep1) {
    if (gameLogic("O")) {
      player1Win++;
      scoreP1El.innerHTML = player1Win;
      displayWinner(1, "O");
    } else if (numberOfEntries == 9) {
      tieCount++;
      scoreTieEl.innerHTML = tieCount;
      showtieresult();
    }

    player2El.classList.add("active");
    player1El.classList.remove("active");
    ele.innerHTML = "O";
    activep1 = false;
    activep2 = true;
  } else {
    if (gameLogic("X")) {
      player2Win++;
      scoreP2El.innerHTML = player2Win;
      displayWinner(2, "X");
    }

    ele.innerHTML = "X";
    player1El.classList.add("active");
    player2El.classList.remove("active");
    activep1 = true;
    activep2 = false;
  }
}

btnRulesEl.addEventListener("click", function () {
  rulesContainerEl.classList.remove("d--none");
});
btnRulesCloseEl.addEventListener("click", function () {
  rulesContainerEl.classList.add("d--none");
});

btnPlayAgainEl.addEventListener("click", reset);

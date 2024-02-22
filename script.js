let blockSize = 25;
let totalRows = 17;
let totalCols = 17;
let board;
let context;
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let speedX = 0;
let speedY = 0;
let snakeBody = [];
let foodX;
let foodY;
let gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = totalRows * blockSize;
  board.width = totalCols * blockSize;
  context = board.getContext("2d");
  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000 / 5);
};

function update() {
  if (gameOver) {
    return;
  }
  context.fillStyle = "green";
  context.fillRect(0, 0, board.width, board.height);
  context.fillStyle = "yellow";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "white";
  snakeX += speedX * blockSize;
  snakeY += speedY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  if (
    snakeX < 0 ||
    snakeX >= totalCols * blockSize ||
    snakeY < 0 ||
    snakeY >= totalRows * blockSize
  ) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      gameOver = true;
    }
  }
  if (gameOver === true) {
    context.fillStyle = "white";
    context.font = "20px Arial";
    //put it in the middle
    context.fillText("Press Enter to restart", 118, 215);
    document.addEventListener("keyup", function (e) {
      if (e.code === "Enter") {
        restartGame();
      }
    });
  }
}

function changeDirection(e) {
  if (e.code === "ArrowUp" && speedY !== 1) {
    speedX = 0;
    speedY = -1;
  } else if (e.code === "ArrowDown" && speedY !== -1) {
    speedX = 0;
    speedY = 1;
  } else if (e.code === "ArrowLeft" && speedX !== 1) {
    speedX = -1;
    speedY = 0;
  } else if (e.code === "ArrowRight" && speedX !== -1) {
    speedX = 1;
    speedY = 0;
  }
}

let score = 0; // Initialize score

//restart game function
function restartGame() {
  location.reload();
}

function placeFood() {
  foodX = Math.floor(Math.random() * totalCols) * blockSize;
  foodY = Math.floor(Math.random() * totalRows) * blockSize;
}

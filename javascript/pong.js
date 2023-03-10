const gameContainer = document.querySelector(".game-container");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const ball = document.querySelector(".ball");
const player1Score = document.querySelector(".player1-score");
const player2Score = document.querySelector(".player2-score");
const startButton = document.querySelector(".start-button");
const restartButton = document.querySelector(".restart-button");
const stopButton = document.querySelector(".stop-button");

let ballXPosition = 246;
let ballYPosition = 146;
let ballXSpeed = -2;
let ballYSpeed = 2;
let player1YPosition = 120;
let player2YPosition = 120;
let player1ScoreCount = 0;
let player2ScoreCount = 0;
let gameRunning = false;
let gameStopped = false;

function moveBall() {
  ballXPosition += ballXSpeed;
  ballYPosition += ballYSpeed;

  // Check if the ball hits the player1 paddle
  if (
    ballXPosition <= 18 &&
    ballYPosition >= player1YPosition - 8 &&
    ballYPosition <= player1YPosition + 58
  ) {
    ballXSpeed = -ballXSpeed;
  }

  // Check if the ball hits the player2 paddle
  if (
    ballXPosition >= 472 &&
    ballYPosition >= player2YPosition - 8 &&
    ballYPosition <= player2YPosition + 58
  ) {
    ballXSpeed = -ballXSpeed;
  }

  // Check if the ball hits the top or bottom wall
  if (ballYPosition <= 0 || ballYPosition >= 292) {
    ballYSpeed = -ballYSpeed;
  }

  // Check if the ball goes out of bounds on the left or right side
  if (ballXPosition <= -10) {
    player2ScoreCount++;
    player2Score.textContent = player2ScoreCount;
    if (player2ScoreCount >= 10) {
      endGame("Player 2");
    } else {
      resetBall();
    }
  } else if (ballXPosition >= 506) {
    player1ScoreCount++;
    player1Score.textContent = player1ScoreCount;
    if (player1ScoreCount >= 10) {
      endGame("Player 1");
    } else {
      resetBall();
    }
  }

  ball.style.top = ballYPosition + "px";
  ball.style.left = ballXPosition + "px";
}

function movePlayer1(event) {
  if (event.keyCode === 87 && player1YPosition > 0) {
    player1YPosition -= 10;
    player1.style.top = player1YPosition + "px";
  }
  if (event.keyCode === 83 && player1YPosition < 240) {
    player1YPosition += 10;
    player1.style.top = player1YPosition + "px";
  }
}

function movePlayer2(event) {
  if (event.keyCode === 38 && player2YPosition > 0) {
    player2YPosition -= 10;
    player2.style.top = player2YPosition + "px";
  }
  if (event.keyCode === 40 && player2YPosition < 240) {
    player2YPosition += 10;
    player2.style.top = player2YPosition + "px";
  }
}

function resetBall() {
  ballXPosition = 246;
  ballYPosition = 146;
  ballXSpeed = -2;
  ballYSpeed = 2;
}
function startGame() {
  if (!gameRunning) {
    gameRunning = true;
    gameStopped = false;
    startButton.textContent = "Pause";
    player1ScoreCount = 0;
    player2ScoreCount = 0;
    player1Score.textContent = "0";
    player2Score.textContent = "0";
    resetBall();
    moveBallInterval = setInterval(moveBall, 10);
  } else {
    gameRunning = false;
    startButton.textContent = "Resume";
    clearInterval(moveBallInterval);
  }
}

function endGame(winner) {
  clearInterval(moveBallInterval);
  gameRunning = false;
  gameStopped = true;
  alert(`${winner} wins the game!`);
  startButton.textContent = "Start";
}

function restartGame() {
  clearInterval(moveBallInterval);
  gameRunning = false;
  gameStopped = false;
  startButton.textContent = "Start";
  player1ScoreCount = 0;
  player2ScoreCount = 0;
  player1Score.textContent = "0";
  player2Score.textContent = "0";
  resetBall();
  player1YPosition = 120;
  player2YPosition = 120;
  player1.style.top = player1YPosition + "px";
  player2.style.top = player2YPosition + "px";
}

function stopGame() {
  clearInterval(moveBallInterval);
  gameRunning = false;
  gameStopped = true;
  startButton.textContent = "Start";
  resetBall();
  player1YPosition = 120;
  player2YPosition = 120;
  player1.style.top = player1YPosition + "px";
  player2.style.top = player2YPosition + "px";
  player1ScoreCount = 0;
  player2ScoreCount = 0;
  player1Score.textContent = "0";
  player2Score.textContent = "0";
}

document.addEventListener("keydown", movePlayer1);
document.addEventListener("keydown", movePlayer2);
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
stopButton.addEventListener("click", stopGame);


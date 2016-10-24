import Keys from "./Keys.js";
import Dir from "./Dir.js";
import Snake from "./Snake.js"
import Food from "./Food.js"

var canvas = null;
var context = null;
var scaleFactor = 20;

var pointsElt = null;
var points = 0;

var gameStatusElt = null;

var slowMo = false;
var keyPressed = false;
var gameOver = false;

var snake = null;
var food = null;

function draw() {
  if (gameOver) {
    return;
  }

  if (keyPressed) {
    snake.moveHead();

    if (gotFood()) {
      food.place(
        canvas.width / scaleFactor,
        canvas.height / scaleFactor);
      points += 100 * snake.size();
      pointsElt.innerHTML = points + "";
      snake.growLonger();
    } else if (collided()) {
      gameOver = true;
      gameStatusElt.innerHTML = "game over";
    }
  }

  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  food.highlightPath(context, snake, canvas, scaleFactor);
  food.redraw(context);
  snake.redraw(context);
}


document.addEventListener('keydown', (event) => {
  let head = snake.head();
  let nextDir = null;
  let hasBody = snake.hasBody();

  if (gameOver) {
    return;
  }

  switch (event.keyCode) {
    case Keys.Letter_s:
      slowMo = !slowMo;
      if (slowMo) {
        counterEvery = 400;
      } else {
        counterEvery = 100;
      }
      break;
    case Keys.Right:
      keyPressed = true;
      if (head.dir === Dir.Left && hasBody) {
        // do nothing
      } else {
        nextDir = Dir.Right;
      }
      break;

    case Keys.Left:
      keyPressed = true;
      if (head.dir === Dir.Right && hasBody) {
        // do nothing
      } else {
        nextDir = Dir.Left;
      }
      break;

    case Keys.Up:
      keyPressed = true;
      if (head.dir === Dir.Down && hasBody) {
        // do nothing
      } else {
        nextDir = Dir.Up;
      }
      break;

  case Keys.Down:
      keyPressed = true;
      if (head.dir === Dir.Up && hasBody) {
        // do nothing
      } else {
        nextDir = Dir.Down;
      }
      break;

    case Keys.Space:
      keyPressed = !keyPressed;
      break;

    default:
      return;
  }

  gameStatusElt.innerHTML = (keyPressed ? "playing" : "paused");
  if (!keyPressed) {
    return;
  }

  if (nextDir !== null) {
    head.dir = nextDir;
  }

});

let counter = 0;
let lastTime = 0;
let counterEvery = 100;

function update(time = 0) {
  let delta = time - lastTime;
  lastTime = time;

  counter += delta;
  if (counter > counterEvery) {
    if (keyPressed && !gameOver) {
      draw();
    }
    counter = 0;
  }

  requestAnimationFrame(update);
}

function gotFood() {
  let head = snake.head();
  return (
    head.x === food.x &&
    head.y === food.y);
}

function collided() {
  let head = snake.head();
  if (head.x < 0 || head.x >= (canvas.width / scaleFactor)) {
    return true;
  }
  if (head.y < 0 || head.y >= (canvas.height / scaleFactor)) {
    return true;
  }
  for (let i = 1; i < snake.body.length; i++) {
    let elt = snake.body[i];
    if (elt.x === head.x && elt.y == head.y) {
      return true;
    }
  }
  return false;
}


function main() {
  canvas = document.getElementById("board");
  context = canvas.getContext("2d");
  context.scale(scaleFactor, scaleFactor);

  pointsElt = document.getElementById("points");

  gameStatusElt = document.getElementById("gamestatus");

  food = new Food();
  food.place(
    canvas.width / scaleFactor,
    canvas.height / scaleFactor);
  snake = new Snake();

  draw();
  update();
}

window.main = main;

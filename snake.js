var canvas = document.getElementById("board");
var context = canvas.getContext("2d");
var scaleFactor = 20;

var pointsElt = null;
var points = 0;
var snakeSizeElt = null;

var gameStatusElt = null;

var slowMo = false;
var keyPressed = false;
var gameOver = false;

const Keys = {
  Right: 39,
  Left: 37,
  Down: 40,
  Up: 38,
  Space: 32,
  Letter_s: 83,
};


const Dir = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3
};

var snake = {
  body: [
    {x: 0, y: 0, dir: Dir.Down},
  ],
};

function snakeLonger() {
  if (!keyPressed) {
    return;
  }

  let last = snake.body[snake.body.length - 1];
  let extra = {x: last.x, y: last.y, dir: last.dir};

  switch (last.dir) {
  case Dir.Up:
    extra.y += 1;
    break;
  case Dir.Down:
    extra.y -= 1;
    break;
  case Dir.Left:
    extra.x += 1;
    break;
  case Dir.Right:
    extra.x -= 1;
    break;
  default:
    break;
  }

  snake.body.push(extra);
  snakeSizeElt.innerHTML = snake.body.length + "";
}

function randRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var food = null;

function placeFood() {
  if (food === null) {
    let w = canvas.width / scaleFactor;
    let h = canvas.height / scaleFactor;

    food = {
      x: randRange(0, w),
      y: randRange(0, h),
    };
  }
}

function highlightFood() {
  if (!food) {
    return;
  }

  let markerColor = '#333';
  let head = snake.body[0];

  if ((head.dir === Dir.Left && head.x - 1 === food.x) ||
      (head.dir === Dir.Right && head.x + 1 === food.x)) {
    // Draw vertical marker
    context.fillStyle = markerColor;
    context.fillRect(food.x, 0, 1, canvas.height / scaleFactor);
  }
  if ((head.dir === Dir.Up && head.y - 1 === food.y) ||
      (head.dir === Dir.Down && head.y + 1 == food.y)) {
    // Draw horizontal marker
    context.fillStyle = markerColor;
    context.fillRect(0, food.y, canvas.width / scaleFactor, 1);
  }
}

function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  placeFood();
  highlightFood();
  context.fillStyle = '#39aaaa';
  context.fillRect(food.x, food.y, 1, 1);

  context.fillStyle = '#AA3939';
  snake.body.forEach((elt, idx) => {
    context.fillRect(elt.x, elt.y, 1, 1);
  });
}

function moveHead() {
  let head = snake.body[0];

  for (let i = snake.body.length - 1; i > 0; i--) {
    snake.body[i].x = snake.body[i - 1].x;
    snake.body[i].y = snake.body[i - 1].y;
    snake.body[i].dir = snake.body[i - 1].dir;
  }

  switch (head.dir) {
  case Dir.Up:
    head.y -= 1;
    break;
  case Dir.Down:
    head.y += 1;
    break;
  case Dir.Left:
    head.x -= 1;
    break;
  case Dir.Right:
    head.x += 1;
    break;
  default:
    break;
  }

  if (gotFood()) {
    food = null;
    points += 100 * snake.body.length;
    pointsElt.innerHTML = points + "";
    snakeLonger();
  } else if (collided()) {
    gameOver = true;
    gameStatusElt.innerHTML = "game over";
  }
}


document.addEventListener('keydown', (event) => {
  let head = snake.body[0];
  let nextDir = null;
  let hasBody = snake.body.length > 1;

  if (gameOver) {
    return;
  }

  console.log(event.keyCode);

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
      console.log('up pressed, cur dir', head.dir);
      keyPressed = true;
      if (head.dir === Dir.Down && hasBody) {
        // do nothing
      } else {
        console.log('yep');
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

  console.log('keyPressed', keyPressed);
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
      moveHead();
      draw();
    }
    counter = 0;
  }

  requestAnimationFrame(update);
}

function gotFood() {
  let head = snake.body[0];
  return (
    food &&
    head.x === food.x &&
    head.y === food.y);
}

function collided() {
  let head = snake.body[0];
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
  snakeSizeElt = document.getElementById("snakesize");

  gameStatusElt = document.getElementById("gamestatus");

  draw();
  update();
}

window.main = main;

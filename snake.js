// TODO:
//  - check snake body collision
//  - can't move in opposite dir: doing up, can't go down
//    (only left or right)
var canvas = document.getElementById("board");
var context = canvas.getContext("2d");
var scaleFactor = 20;
context.scale(scaleFactor, scaleFactor);

var pointsElt = null;
var points = 0;

var keyPressed = false;

var Dir = {
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

  console.log('last', JSON.stringify(last));

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
  console.log('extra', JSON.stringify(extra));
  firsttime = true;
  snake.body.push(extra);
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

let firsttime = true;

function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  if (firsttime) {
    console.log('snake.body.len', snake.body.length);
    firsttime = false;
  }

  placeFood();
  context.fillStyle = 'green';
  context.fillRect(food.x, food.y, 1, 1);

  context.fillStyle = 'red';
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

  console.log(JSON.stringify(snake.body));

  if (gotFood()) {
    food = null;
    points += 100;
    if (!pointsElt) {
      pointsElt = document.getElementById("points");
    }
    pointsElt.innerHTML = points + "";
    snakeLonger();
  } else if (collided()) {
    keyPressed = false;
    alert('game over');
  }
}

const Keys = {
  Right: 39,
  Left: 37,
  Down: 40,
  Up: 38,
  Space: 32,
};

document.addEventListener('keydown', (event) => {
  let head = snake.body[0];
  switch (event.keyCode) {
  case Keys.Right:
    keyPressed = true;
    head.dir = Dir.Right;
    break;
  case Keys.Left:
    keyPressed = true;
    head.dir = Dir.Left;
    break;
  case Keys.Up:
    keyPressed = true;
    head.dir = Dir.Up;
    break;
  case Keys.Down:
    keyPressed = true;
    head.dir = Dir.Down;
    break;
  case Keys.Space:
    keyPressed = !keyPressed;
    break;
  default:
    break;
  }
});

let counter = 0;
let lastTime = 0;
function update(time = 0) {
  let delta = time - lastTime;
  lastTime = time;

  counter += delta;
  if (counter > 100) {
    if (keyPressed) {
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

draw();
update();

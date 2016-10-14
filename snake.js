var canvas = document.getElementById("board");
var context = canvas.getContext("2d");
context.scale(20, 20);

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
  console.log('snakeLonger');

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
}

setInterval(snakeLonger, 1000);

function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = snake.body.length - 1; i > 0; i--) {
    snake.body[i].x = snake.body[i - 1].x;
    snake.body[i].y = snake.body[i - 1].y;
    snake.body[i].dir = snake.body[i - 1].dir;
  }

  let head = snake.body[0];
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

  context.fillStyle = 'red';
  snake.body.forEach((elt, idx) => {
    context.fillRect(elt.x, elt.y, 1, 1);
  });
}

const Keys = {
  Right: 39,
  Left: 37,
  Down: 40,
  Up: 38,
};

document.addEventListener('keydown', (event) => {
  let head = snake.body[0];

  switch (event.keyCode) {
  case Keys.Right:
    head.dir = Dir.Right;
    break;
  case Keys.Left:
    head.dir = Dir.Left;
    break;
  case Keys.Up:
    head.dir = Dir.Up;
    break;
  case Keys.Down:
    head.dir = Dir.Down;
    break;
  default:
    break;
  }

  draw();
});

draw();


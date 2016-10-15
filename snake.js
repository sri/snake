// TODO:
//  - check snake body collision
//  - can't move in opposite dir: doing up, can't go down
//    (only left or right)
var canvas = document.getElementById("board");
var context = canvas.getContext("2d");
var scaleFactor = 20;
context.scale(scaleFactor, scaleFactor);

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

function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = snake.body.length - 1; i > 0; i--) {
    snake.body[i].x = snake.body[i - 1].x;
    snake.body[i].y = snake.body[i - 1].y;
    snake.body[i].dir = snake.body[i - 1].dir;
  }

  context.fillStyle = 'red';
  snake.body.forEach((elt, idx) => {
    context.fillRect(elt.x, elt.y, 1, 1);
  });
}

function tryLeftOrRight() {
  console.log('tryLeftOrRight');
  let head = snake.body[0];
  head.x -= 1; // try left
  if (collided()) {
    console.log('left collided');
    head.x += 1; // come back to original pos
    head.x += 1; // try right
    if (collided()) {
      console.log('right collided');
      head.x -= 1; // come back to original pos
    } else {
      // no collision, going right now
      head.dir = Dir.Right;
    }
  } else {
    // no collision, so going left now
    head.dir = Dir.Left;
  }
}

function tryUpOrDown() {
  console.log('tryUpOrDown');
  let head = snake.body[0];
  head.y -= 1; // try up
  if (collided()) {
    head.y += 1; // come back to original pos
    head.y += 1; // try down
    if (collided()) {
      head.y -= 1; // come back to original pos
    } else {
      // no collision, so going left now
      head.dir = Dir.Down;
    }
  } else {
    // no collision, so going left now
    head.dir = Dir.Up;
  }
}

function moveHead() {
  let head = snake.body[0];
  switch (head.dir) {
  case Dir.Up:
    head.y -= 1;
    if (collided()) {
      head.y += 1; // come back to original pos
      tryLeftOrRight();
    }
    break;
  case Dir.Down:
    head.y += 1;
    if (collided()) {
      console.log('before back to orig', snake.body[0]);
      head.y -= 1; // come back to original pos
      console.log('after back to orig', snake.body[0]);
      tryLeftOrRight();
    }
    break;
  case Dir.Left:
    head.x -= 1;
    if (collided()) {
      head.x += 1; // come back to original pos
      tryUpOrDown();
    }
    break;
  case Dir.Right:
    head.x += 1;
    if (collided()) {
      head.x -= 1; // come back to original pos
      tryUpOrDown();
    }
    break;
  default:
    break;
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
      console.log('after moveHead: head => ', snake.body[0])
      draw();
    }
    counter = 0;
  }

  requestAnimationFrame(update);
}

function collided() {
  let head = snake.body[0];
  if (head.x < 0 || head.x >= (canvas.width / scaleFactor)) {
    console.log('collided -1');
    return true;
  }
  if (head.y < 0 || head.y >= (canvas.height / scaleFactor)) {
    console.log('collided -2');
    return true;
  }
  // for (let i = 1; i < snake.body.length; i++) {
  //   let elt = snake.body[i];
  //   if (elt.x === head.x && elt.y == head.y) {
  //     console.log('collided ' + i);
  //     return true;
  //   }
  // }
  return false;
}

draw();
update();
setInterval(snakeLonger, 1000);


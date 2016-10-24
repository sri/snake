import Food from "./Food.js";
import Snake from "./Snake.js";
import Keys from "./Keys.js";
import Dir from "./Dir.js";

export default class Board {
  constructor() {
    this.canvas = document.getElementById("board");
    this.context = this.canvas.getContext("2d");
    this.scaleFactor = 20;
    this.context.scale(this.scaleFactor,this.scaleFactor);

    this.width = this.canvas.width / this.scaleFactor;
    this.height = this.canvas.height / this.scaleFactor;

    this.pointsEl = document.getElementById("points");
    this.points = 0;

    this.gameStatusEl = document.getElementById("gamestatus");
    this.gameOver = false;

    this.food = new Food();
    this.food.place(this.width, this.height);
    this.snake = new Snake();

    this.keyPressed = false;
    this.slowMo = false;

    this.counter = 0;
    this.lastTime = 0;
    this.counterEvery = 100;

    document.addEventListener('keydown', (e) => this.onKeyPress(e));
  }

  run() {
    this.draw();
    this.update();
  }

  update(time = 0) {
    if (this.gameOver) {
      return;
    }

    let delta = time - this.lastTime;

    this.lastTime = time;
    this.counter += delta;

    if (this.counter > this.counterEvery) {
      if (this.keyPressed) {
        this.draw();
      }
      this.counter = 0;
    }

    requestAnimationFrame((time) => this.update(time));
  }

  draw() {
    if (this.keyPressed) {
      this.snake.moveHead();

      if (this.gotFood()) {
        this.food.place(this.width, this.height);
        this.points += 100 * this.snake.size();
        this.pointsEl.innerHTML = this.points + "";
        this.snake.growLonger();
      } else if (this.collided()) {
        this.gameOver = true;
        this.gameStatusEl.innerHTML = "game over";
      }
    }

    let context = this.context;
    let canvas = this.canvas;

    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    this.food.highlightPath(context, this.snake, this.width, this.height);
    this.food.redraw(context);
    this.snake.redraw(context);
  }

  collided() {
    let head = this.snake.head();
    if (head.x < 0 || head.x >= this.width) {
      return true;
    }
    if (head.y < 0 || head.y >= this.height) {
      return true;
    }
    for (let i = 1; i < this.snake.body.length; i++) {
      let elt = this.snake.body[i];
      if (elt.x === head.x && elt.y == head.y) {
        return true;
      }
    }
    return false;
  }

  gotFood() {
    let head = this.snake.head();
    return (
      head.x === this.food.x &&
      head.y === this.food.y);
  }

  onKeyPress(event) {
    let head = this.snake.head();
    let nextDir = null;
    let hasBody = this.snake.hasBody();

    if (this.gameOver) {
      return;
    }

    switch (event.keyCode) {
      case Keys.Letter_s:
        this.slowMo = !this.slowMo;
        if (this.slowMo) {
          this.counterEvery = 400;
        } else {
          this.counterEvery = 100;
        }
        break;

      case Keys.Right:
        this.keyPressed = true;
        if (head.dir === Dir.Left && hasBody) {
          // do nothing
        } else {
          nextDir = Dir.Right;
        }
        break;

      case Keys.Left:
        this.keyPressed = true;
        if (head.dir === Dir.Right && hasBody) {
          // do nothing
        } else {
          nextDir = Dir.Left;
        }
        break;

      case Keys.Up:
        this.keyPressed = true;
        if (head.dir === Dir.Down && hasBody) {
          // do nothing
        } else {
          nextDir = Dir.Up;
        }
        break;

      case Keys.Down:
        this.keyPressed = true;
        if (head.dir === Dir.Up && hasBody) {
          // do nothing
        } else {
          nextDir = Dir.Down;
        }
        break;

      case Keys.Space:
        this.keyPressed = !this.keyPressed;
        break;

      default:
        return;
    }

    this.gameStatusEl.innerHTML = (
      this.keyPressed ? "playing" : "paused");
    if (!this.keyPressed) {
      return;
    }

    if (nextDir !== null) {
      head.dir = nextDir;
    }
  }
}
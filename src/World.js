import Food from "./Food.js";
import Snake from "./Snake.js";
import Keys from "./Keys.js";
import Dir from "./Dir.js";
import { shortestPath } from "./Path.js";

export default class World {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.scaleFactor = 20;
    this.context.scale(this.scaleFactor,this.scaleFactor);

    this.width = this.canvas.width / this.scaleFactor;
    this.height = this.canvas.height / this.scaleFactor;

    this.pointsEl = document.getElementById("points");
    this.points = 0;
    this.bonusEl = document.getElementById("bonus");

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

    // No bonus for the 1st time!
    this.shortestPathCount = null;

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

  checkShortestPathBonus() {
    if (this.snake.totalMovesSinceGrowingLonger === this.shortestPathCount) {
      this.bonusEl.innerHTML = "shortest path bonus!"
      this.updatePoints(this.points * 2);
    } else if (this.shortestPathCount !== null) {
      let n = this.snake.totalMovesSinceGrowingLonger - this.shortestPathCount;
      this.bonusEl.innerHTML = `(missed shortest path by ${n} moves)`;
    }
  }

  updatePoints(points) {
    this.points = points;
    this.pointsEl.innerHTML = this.points + "";
  }

  draw() {
    if (this.keyPressed) {
      this.snake.moveHead();

      if (this.gotFood()) {
        this.checkShortestPathBonus();
        this.food.place(this.width, this.height);
        this.shortestPathCount = shortestPath(
          this.food.location(),
          this.snake.location()
        );
        this.updatePoints(this.points + 100 * this.snake.size());
        this.snake.growLonger();
      } else if (this.snake.collided(this.width, this.height)) {
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

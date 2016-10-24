import Dir from "./Dir.js";

export default class Snake {
  constructor() {
    this.snakeSizeEl = document.getElementById("snakesize");

    this.body = [
      {x: 0, y: 0, dir: Dir.Down},
    ];
  }

  collided(width, height) {
    let head = this.head();

    // Check for collision with boundary.
    if (head.x < 0 || head.x >= width) {
      return true;
    } else if (head.y < 0 || head.y >= height) {
      return true;
    }

    // Check for collision with itself.
    for (let i = 1; i < this.body.length; i++) {
      let elt = this.body[i];
      if (elt.x === head.x && elt.y == head.y) {
        return true;
      }
    }
    return false;
  }

  redraw(context) {
    context.fillStyle = '#AA3939';
    this.body.forEach((e, i) => {
      context.fillRect(e.x, e.y, 1, 1);
    });
  }

  moveHead() {
    // Copy the location and direction of
    // the neighbor before cell.
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
      this.body[i].dir = this.body[i - 1].dir;
    }

    let head = this.head();
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
  }

  hasBody() {
    return this.body.length > 1;
  }

  growLonger() {
    let last = this.tail();
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

    this.body.push(extra);
    this.snakeSizeEl.innerHTML = this.body.length + "";
  }

  head() {
    return this.body[0];
  }

  tail() {
    return this.body[this.body.length - 1];
  }

  size() {
    return this.body.length;
  }
}

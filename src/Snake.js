import Dir from "./Dir.js";

export default class Snake {
  constructor() {
    this.snakeSizeEl = document.getElementById("snakesize");

    this.body = [
      {x: 0, y: 0, dir: Dir.Down},
    ];
  }

  redraw(context) {
    context.fillStyle = '#AA3939';
    this.body.forEach((e, i) => {
      context.fillRect(e.x, e.y, 1, 1);
    });
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

  headDir() {
    return this.head().dir;
  }
}

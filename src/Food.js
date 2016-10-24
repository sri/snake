import { randRange } from "./Random.js";
import Dir from "./Dir.js";

export default class Food {
  constructor() {
    this.x = null;
    this.y = null;
  }

  redraw(context) {
    context.fillStyle = "#39AAAA";
    context.fillRect(this.x, this.y, 1, 1);
  }

  place(width, height) {
    this.x = randRange(0, width);
    this.y = randRange(0, height);
  }

  highlightPath(context, snake, width, height) {
    let markerColor = '#333';
    let head = snake.head();

    if ((head.dir === Dir.Left && head.x - 1 === this.x) ||
        (head.dir === Dir.Right && head.x + 1 === this.x)) {
      // Draw vertical marker
      context.fillStyle = markerColor;
      context.fillRect(this.x, 0, 1, height);
    }

    if ((head.dir === Dir.Up && head.y - 1 === this.y) ||
        (head.dir === Dir.Down && head.y + 1 == this.y)) {
      // Draw horizontal marker
      context.fillStyle = markerColor;
      context.fillRect(0, this.y, width, 1);
    }
  }
}

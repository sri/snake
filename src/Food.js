import { randRange } from "./Random.js";
import Dir from "./Dir.js";

export default class Food {
  constructor() {
    this.x = null;
    this.y = null;
  }

  location() {
    return {
      x: this.x,
      y: this.y
    };
  }

  redraw(context) {
    context.fillStyle = "#39AAAA";
    context.fillRect(this.x, this.y, UNIT_SIZE, UNIT_SIZE);
  }

  place(width, height) {
    const x = randRange(0, width);
    const y = randRange(0, height);

    this.x = x - (x % UNIT_SIZE);
    this.y = y - (y % UNIT_SIZE);
  }

  highlightPath(context, snake, width, height) {
    let markerColor = '#111';
    let head = snake.head();

    if ((head.dir === Dir.Left && head.x - UNIT_SIZE === this.x) ||
        (head.dir === Dir.Right && head.x + UNIT_SIZE === this.x)) {
      // Draw vertical marker
      context.fillStyle = markerColor;
      context.fillRect(this.x, 0, UNIT_SIZE, height);
    }


    if ((head.dir === Dir.Up && head.y - UNIT_SIZE === this.y) ||
        (head.dir === Dir.Down && head.y + UNIT_SIZE == this.y)) {
      // Draw horizontal marker
      context.fillStyle = markerColor;
      context.fillRect(0, this.y, width, UNIT_SIZE);
    }
  }
}

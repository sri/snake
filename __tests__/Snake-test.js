const Snake = require('../src/Snake.js').default;
const Dir = require('../src/Dir.js').default;

window.UNIT_SIZE = 20;

test('Snake.changeDir without body', () => {
  const snake = new Snake();
  snake.head().dir = Dir.Right;

  snake.changeDir(Dir.Left);

  expect(snake.head().dir).toBe(Dir.Left);
});

test('Snake.changeDir with body', () => {
  const snake = new Snake();
  snake.head().dir = Dir.Right;
  snake.snakeSizeEl = {};
  snake.growLonger();

  snake.changeDir(Dir.Left);

  expect(snake.head().dir).toBe(Dir.Right);
});

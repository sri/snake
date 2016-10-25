window.UNIT_SIZE = 20;

test('food gets placed correctly', () => {
  const Food = require('../src/Food.js').default;

  const food = new Food();
  food.place(10, 10);

  expect(food.x).not.toBe(null);
  expect(food.y).not.toBe(null);
});

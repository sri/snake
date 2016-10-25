const Path = require('../src/Path.js');

test('shortestPath of same points should be zero', () => {
  let start = {x: 10, y: 10};

  expect(Path.shortestPath(start, start)).toBe(0);
});


test('shortestPath when x is same', () => {
  const start = {x: 10, y: 100};
  const end = {x: 10, y: 80};

  expect(Path.shortestPath(start, end)).toBe(20);
});

test('shortestPath when y is the same', () => {
  const start = {x: 10, y: 100};
  const end = {x: 0, y: 100};

  expect(Path.shortestPath(start, end)).toBe(10);
});

test('shortestPath when x & y are different', () => {
  const start = {x: 1, y: 7};
  const end = {x: 11, y: 19};

  expect(Path.shortestPath(start, end)).toBe(22);
  expect(Path.shortestPath(end, start)).toBe(22);
});

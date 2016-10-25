const shortestPath = (start, end) => {
  const xSteps = Math.abs(start.x - end.x);
  const ySteps = Math.abs(start.y - end.y);

  return xSteps + ySteps;
};

export {
  shortestPath
};

const Dir = {
  Up:    0,
  Down:  1,
  Left:  2,
  Right: 3,

  isOpposite(a, b) {
    switch (a) {
      case Dir.Left:
        return b === Dir.Right;
      case Dir.Right:
        return b === Dir.Left;
      case Dir.Up:
        return b === Dir.Down;
      case Dir.Down:
        return b === Dir.Up;
      default:
        return false;
    }
  }
};

export default Dir;

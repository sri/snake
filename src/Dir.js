const Dir = {
  Up:    0,
  Down:  1,
  Left:  2,
  Right: 3,

  isOpposite(a, b) {
    return (
      (a === Dir.Left && b === Dir.Right) ||
      (a === Dir.Right && b === Dir.Left) ||
      (a === Dir.Up && b === Dir.Down) ||
      (a === Dir.Down && b === Dir.Up)
    );
  }
};



export default Dir;

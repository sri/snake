import World from "./World.js"

window.UNIT_SIZE = 20;

function main() {
  let world = new World();
  world.run();
}

window.main = main;

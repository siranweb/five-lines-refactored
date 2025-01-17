
const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

enum RawTile {
  AIR,
  FLUX,
  UNBREAKABLE,
  PLAYER,
  STONE, FALLING_STONE,
  BOX, FALLING_BOX,
  KEY1, LOCK1,
  KEY2, LOCK2
}

interface Tile {
  color(g: CanvasRenderingContext2D): void;
  draw(g: CanvasRenderingContext2D, x: number, y: number): void;
  moveHorizontal(dx: number): void;
  moveVertical(dy: number): void;
  isEdible(): boolean;
  isPushable(): boolean;
  isAir(): boolean;
  isFlux(): boolean;
  isUnbreakable(): boolean;
  isPlayer(): boolean;
  isStone(): boolean;
  isFallingStone(): boolean;
  isBox(): boolean;
  isFallingBox(): boolean;
  isKey1(): boolean;
  isLock1(): boolean;
  isKey2(): boolean;
  isLock2(): boolean;
}

class AirTile implements Tile {
  color(g: CanvasRenderingContext2D) {}
  draw(g: CanvasRenderingContext2D, x: number, y: number) {}
  moveHorizontal(dx: number) {
    moveToTile(playerx + dx, playery);
  }
  moveVertical(dy: number) {
    moveToTile(playerx, playery + dy);
  }
  isEdible() { return this.isAir() || this.isFlux() };
  isPushable() { return this.isBox() || this.isStone() };
  isAir() { return true };
  isFlux() { return false };
  isUnbreakable() { return false };
  isPlayer() { return false };
  isStone() { return false };
  isFallingStone() { return false };
  isBox() { return false };
  isFallingBox() { return false };
  isKey1() { return false };
  isLock1() { return false };
  isKey2() { return false };
  isLock2() { return false };
}

class FluxTile implements Tile {
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#ccffcc';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    const tile = map[y][x];
    tile.color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {
    moveToTile(playerx + dx, playery);
  }
  moveVertical(dy: number) {
    moveToTile(playerx, playery + dy);
  }
  isEdible() { return this.isAir() || this.isFlux() };
  isPushable() { return this.isBox() || this.isStone() };
  isAir() { return false };
  isFlux() { return true };
  isUnbreakable() { return false };
  isPlayer() { return false };
  isStone() { return false };
  isFallingStone() { return false };
  isBox() { return false };
  isFallingBox() { return false };
  isKey1() { return false };
  isLock1() { return false };
  isKey2() { return false };
  isLock2() { return false };
}

class UnbreakableTile implements Tile {
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#999999';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    const tile = map[y][x];
    tile.color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {}
  moveVertical(dy: number) {}
  isEdible() { return this.isAir() || this.isFlux() };
  isPushable() { return this.isBox() || this.isStone() };
  isAir() { return false };
  isFlux() { return false };
  isUnbreakable() { return true };
  isPlayer() { return false };
  isStone() { return false };
  isFallingStone() { return false };
  isBox() { return false };
  isFallingBox() { return false };
  isKey1() { return false };
  isLock1() { return false };
  isKey2() { return false };
  isLock2() { return false };
}

class PlayerTile implements Tile {
  color(g: CanvasRenderingContext2D) {}
  draw(g: CanvasRenderingContext2D, x: number, y: number) {}
  moveHorizontal(dx: number) {}
  moveVertical(dy: number) {}
  isEdible() { return this.isAir() || this.isFlux() };
  isPushable() { return this.isBox() || this.isStone() };
  isAir() { return false };
  isFlux() { return false };
  isUnbreakable() { return false };
  isPlayer() { return true };
  isStone() { return false };
  isFallingStone() { return false };
  isBox() { return false };
  isFallingBox() { return false };
  isKey1() { return false };
  isLock1() { return false };
  isKey2() { return false };
  isLock2() { return false };
}

class StoneTile implements Tile {
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#0000cc';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    const tile = map[y][x];
    tile.color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {
    if (map[playery][playerx + dx + dx].isAir()
      && !map[playery + 1][playerx + dx].isAir()) {
      map[playery][playerx + dx + dx] = map[playery][playerx + dx];
      moveToTile(playerx + dx, playery);
    }
  }
  moveVertical(dy: number) {}
  isEdible() { return this.isAir() || this.isFlux() };
  isPushable() { return this.isBox() || this.isStone() };
  isAir() { return false };
  isFlux() { return false };
  isUnbreakable() { return false };
  isPlayer() { return false };
  isStone() { return true };
  isFallingStone() { return false };
  isBox() { return false };
  isFallingBox() { return false };
  isKey1() { return false };
  isLock1() { return false };
  isKey2() { return false };
  isLock2() { return false };
}

class FallingStoneTile implements Tile {
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#0000cc';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    const tile = map[y][x];
    tile.color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {}
  moveVertical(dy: number) {}
  isEdible() { return this.isAir() || this.isFlux() };
  isPushable() { return this.isBox() || this.isStone() };
  isAir() { return false };
  isFlux() { return false };
  isUnbreakable() { return false };
  isPlayer() { return false };
  isStone() { return false };
  isFallingStone() { return true };
  isBox() { return false };
  isFallingBox() { return false };
  isKey1() { return false };
  isLock1() { return false };
  isKey2() { return false };
  isLock2() { return false };
}

class BoxTile implements Tile {
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#8b4513';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    const tile = map[y][x];
    tile.color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {
    if (map[playery][playerx + dx + dx].isAir()
      && !map[playery + 1][playerx + dx].isAir()) {
      map[playery][playerx + dx + dx] = map[playery][playerx + dx];
      moveToTile(playerx + dx, playery);
    }
  }
  moveVertical(dy: number) {}
  isEdible() { return this.isAir() || this.isFlux() };
  isPushable() { return this.isBox() || this.isStone() };
  isAir() { return false };
  isFlux() { return false };
  isUnbreakable() { return false };
  isPlayer() { return false };
  isStone() { return false };
  isFallingStone() { return false };
  isBox() { return true };
  isFallingBox() { return false };
  isKey1() { return false };
  isLock1() { return false };
  isKey2() { return false };
  isLock2() { return false };
}

class FallingBoxTile implements Tile {
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#8b4513';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    const tile = map[y][x];
    tile.color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {}
  moveVertical(dy: number) {}
  isEdible() { return this.isAir() || this.isFlux() };
  isPushable() { return this.isBox() || this.isStone() };
  isAir() { return false };
  isFlux() { return false };
  isUnbreakable() { return false };
  isPlayer() { return false };
  isStone() { return false };
  isFallingStone() { return false };
  isBox() { return false };
  isFallingBox() { return true };
  isKey1() { return false };
  isLock1() { return false };
  isKey2() { return false };
  isLock2() { return false };
}

class Key1Tile implements Tile {
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#ffcc00';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    const tile = map[y][x];
    tile.color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {
    removeLock1();
    moveToTile(playerx + dx, playery);
  }
  moveVertical(dy: number) {
    removeLock1();
    moveToTile(playerx, playery + dy);
  }
  isEdible() { return this.isAir() || this.isFlux() };
  isPushable() { return this.isBox() || this.isStone() };
  isAir() { return false };
  isFlux() { return false };
  isUnbreakable() { return false };
  isPlayer() { return false };
  isStone() { return false };
  isFallingStone() { return false };
  isBox() { return false };
  isFallingBox() { return false };
  isKey1() { return true };
  isLock1() { return false };
  isKey2() { return false };
  isLock2() { return false };
}

class Lock1Tile implements Tile {
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#ffcc00';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    const tile = map[y][x];
    tile.color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {}
  moveVertical(dy: number) {}
  isEdible() { return this.isAir() || this.isFlux() };
  isPushable() { return this.isBox() || this.isStone() };
  isAir() { return false };
  isFlux() { return false };
  isUnbreakable() { return false };
  isPlayer() { return false };
  isStone() { return false };
  isFallingStone() { return false };
  isBox() { return false };
  isFallingBox() { return false };
  isKey1() { return false };
  isLock1() { return true };
  isKey2() { return false };
  isLock2() { return false };
}

class Key2Tile implements Tile {
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#00ccff';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    const tile = map[y][x];
    tile.color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {
    removeLock2();
    moveToTile(playerx + dx, playery);
  }
  moveVertical(dy: number) {
    removeLock2();
    moveToTile(playerx, playery + dy);
  }
  isEdible() { return this.isAir() || this.isFlux() };
  isPushable() { return this.isBox() || this.isStone() };
  isAir() { return false };
  isFlux() { return false };
  isUnbreakable() { return false };
  isPlayer() { return false };
  isStone() { return false };
  isFallingStone() { return false };
  isBox() { return false };
  isFallingBox() { return false };
  isKey1() { return false };
  isLock1() { return false };
  isKey2() { return true };
  isLock2() { return false };
}

class Lock2Tile implements Tile {
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#00ccff';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    const tile = map[y][x];
    tile.color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {}
  moveVertical(dy: number) {}
  isEdible() { return this.isAir() || this.isFlux() };
  isPushable() { return this.isBox() || this.isStone() };
  isAir() { return false };
  isFlux() { return false };
  isUnbreakable() { return false };
  isPlayer() { return false };
  isStone() { return false };
  isFallingStone() { return false };
  isBox() { return false };
  isFallingBox() { return false };
  isKey1() { return false };
  isLock1() { return false };
  isKey2() { return false };
  isLock2() { return true };
}

interface Input {
  handle(): void;
}

class InputLeft implements Input {
  handle() { map[playery][playerx - 1].moveHorizontal(-1) }
}

class InputRight implements Input {
  handle() { map[playery][playerx + 1].moveHorizontal(1) }
}

class InputUp implements Input {
  handle() { map[playery - 1][playerx].moveVertical(-1) }
}

class InputDown implements Input {
  handle() {map[playery + 1][playerx].moveVertical(1) }
}

let playerx = 1;
let playery = 1;
let rawMap: RawTile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];

let map: Tile[][];

function assertExhausted(x: RawTile): never {
  throw new Error('Unexpected object: ' + x);
}

function transformTile(tile: RawTile) {
  switch (tile) {
    case RawTile.AIR: return new AirTile();
    case RawTile.PLAYER: return new PlayerTile();
    case RawTile.UNBREAKABLE: return new UnbreakableTile();
    case RawTile.STONE: return new StoneTile();
    case RawTile.FALLING_STONE: return new FallingStoneTile();
    case RawTile.BOX: return new BoxTile();
    case RawTile.FALLING_BOX: return new FallingBoxTile();
    case RawTile.FLUX: return new FluxTile();
    case RawTile.KEY1: return new Key1Tile();
    case RawTile.LOCK1: return new Lock1Tile();
    case RawTile.KEY2: return new Key2Tile();
    case RawTile.LOCK2: return new Lock2Tile();
    default: assertExhausted(tile);
  }
}

function transformMap() {
  map = new Array(rawMap.length);
  for (let y = 0; y < rawMap.length; y++) {
    map[y] = new Array(rawMap[y].length);
    for (let x = 0; x < rawMap[y].length; x++) {
      map[y][x] = transformTile(rawMap[y][x]);
    }
  }
}

let inputs: Input[] = [];

function removeLock1() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock1()) {
        map[y][x] = new AirTile();
      }
    }
  }
}

function removeLock2() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock2()) {
        map[y][x] = new AirTile();
      }
    }
  }
}

function moveToTile(newx: number, newy: number) {
  map[playery][playerx] = new AirTile();
  map[newy][newx] = new PlayerTile();
  playerx = newx;
  playery = newy;
}

function update() {
  handleInputs();
  updateMap();
}

function handleInputs() {
  while (inputs.length > 0) {
    const input = inputs.pop();
    input.handle();
  }
}

function updateMap() {
  for (let y = map.length - 1; y >= 0; y--) {
    for (let x = 0; x < map[y].length; x++) {
      updateTile(x, y);
    }
  }
}

function updateTile(x: number, y: number) {
  if ((map[y][x].isStone() || map[y][x].isFallingStone())
    && map[y + 1][x].isAir()) {
    map[y + 1][x] = new FallingStoneTile();
    map[y][x] = new AirTile();
  } else if ((map[y][x].isBox() || map[y][x].isFallingBox())
    && map[y + 1][x].isAir()) {
    map[y + 1][x] = new FallingBoxTile();
    map[y][x] = new AirTile();
  } else if (map[y][x].isFallingStone()) {
    map[y][x] = new StoneTile();
  } else if (map[y][x].isFallingBox()) {
    map[y][x] = new BoxTile();
  }
}


function draw() {
  const g = createGraphics();
  drawMap(g);
  drawPlayer(g);
}

function createGraphics(): CanvasRenderingContext2D {
  let canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
  let g = canvas.getContext("2d");
  g.clearRect(0, 0, canvas.width, canvas.height);
  return g;
}

function drawMap(g: CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].draw(g, x, y);
    }
  }
}

function drawPlayer(g: CanvasRenderingContext2D) {
  g.fillStyle = "#ff0000";
  g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}


function gameLoop() {
  let before = Date.now();
  update();
  draw();
  let after = Date.now();
  let frameTime = after - before;
  let sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}

window.onload = () => {
  transformMap();
  gameLoop();
}

const LEFT_KEY = "ArrowLeft";
const UP_KEY = "ArrowUp";
const RIGHT_KEY = "ArrowRight";
const DOWN_KEY = "ArrowDown";
window.addEventListener("keydown", e => {
  if (e.key === LEFT_KEY || e.key === "a") inputs.push(new InputLeft());
  else if (e.key === UP_KEY || e.key === "w") inputs.push(new InputUp());
  else if (e.key === RIGHT_KEY || e.key === "d") inputs.push(new InputRight());
  else if (e.key === DOWN_KEY || e.key === "s") inputs.push(new InputDown());
});


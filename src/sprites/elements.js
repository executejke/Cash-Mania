import { Container, Sprite } from "pixi.js";

export function createElements(worldWidth, worldHeight) {
  const rowCount = 3;
  const startX = 65;
  const offsetsX = [0, 85, 185];
  const offsetY = 188;
  const rowHeight = 120;
  const container = new Container();
  const elements = [
    "elem1",
    "elem2",
    "elem3",
    "elem4",
    "elem5",
    "elem6",
    "elem7",
    "elem8",
    "elem9",
  ].forEach((element, index) => {
    const sprite = Sprite.from(element);
    sprite.anchor.set(0.5, 0);

    const row = Math.floor(index / rowCount);
    const col = index % rowCount;

    sprite.x = startX + offsetsX[col] + sprite.width / 2;
    sprite.y = offsetY + row * rowHeight;

    container.addChild(sprite);
  });
  return container;
}

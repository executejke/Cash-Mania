import { Container, Sprite } from "pixi.js";

export function createElements(worldWidth, worldHeight) {
  const rowCount = 3; // Количество элементов в ряду
  const startX = 65; // Начальный отступ по X для первого элемента
  const offsetsX = [0, 85, 185]; // Отступы для каждого элемента в ряду
  const offsetY = 188; // Начальный отступ по Y
  const rowHeight = 120; // Высота каждого ряда
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
  //   const sprite = Sprite.from("elem1");
  //   sprite.anchor.set(0.5, 0);
  //   sprite.x = 65 + 42.5;
  //   sprite.y = 188;
  //   console.log(sprite.height);
  //   console.log(worldWidth);
  //   sprite.zIndex = 0;
  return container;
}

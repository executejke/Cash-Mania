import { Container, Sprite } from "pixi.js";

export function createDivides() {
  let offsetX = 456;
  const container = new Container();
  ["divideGPT", "divideGPT"].forEach((divide) => {
    const sprite = Sprite.from(divide);
    sprite.anchor.set(0.5, 0);
    sprite.x = offsetX;
    sprite.y = 292;
    sprite.width = 10;
    sprite.height = 294;
    offsetX += 130;
    container.addChild(sprite);
  });
  container.zIndex = 3;
  return container;
}

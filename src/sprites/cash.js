import { Sprite } from "pixi.js";

export function createCashSprite(worldHeight) {
  const sprite = Sprite.from("cash");
  sprite.zIndex = 4;
  sprite.anchor.set(0, 1);
  sprite.y = worldHeight;

  return sprite;
}

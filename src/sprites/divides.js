import { Sprite } from "pixi.js";

export function createDivides(worldWidth) {
  const sprite = Sprite.from("divides");
  sprite.zIndex = 2;
  sprite.anchor.set(0.5, 0);
  sprite.x = worldWidth / 2;
  sprite.y = 218;
  return sprite;
}

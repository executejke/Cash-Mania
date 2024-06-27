import { Sprite } from "pixi.js";

export function createTexture(worldWidth) {
  const sprite = Sprite.from("texture");
  sprite.x = worldWidth / 2 - sprite.width / 2;
  sprite.zIndex = 5;
  sprite.alpha = 0.24;
  return sprite;
}

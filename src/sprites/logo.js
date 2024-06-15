import { Sprite } from "pixi.js";

export function createLogoSprite(worldWidth) {
  const sprite = Sprite.from("logo");
  sprite.zIndex = 4;
  const offsetY = 28;
  sprite.anchor.set(0.5);
  sprite.x = worldWidth / 2;
  sprite.y = sprite.height / 2 + offsetY;

  return sprite;
}

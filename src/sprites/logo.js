import { Sprite } from "pixi.js";

export function createLogoSprite(worldWidth) {
  const sprite = Sprite.from("logo");
  const offsetY = 28;
  sprite.zIndex = 8;
  sprite.anchor.set(0.5);
  sprite.x = worldWidth / 2;
  sprite.y = 150;
  return sprite;
}

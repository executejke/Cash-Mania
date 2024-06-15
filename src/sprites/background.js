import { Sprite } from "pixi.js";

export function createBackgroundSprite() {
  const sprite = Sprite.from("bg");
  sprite.x = viewport.worldWidth / 2;
  sprite.y = sprite.zIndex = 4;

  return sprite;
}

import { Sprite } from "pixi.js";

export function createTexture() {
  const sprite = Sprite.from("texture");
  sprite.zIndex = 5;
  sprite.alpha = 0.24;
  return sprite;
}

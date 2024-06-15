import { Sprite } from "pixi.js";

export function createBlur(viewport) {
  const sprite = Sprite.from("blur");
  sprite.anchor.set(0.5);
  sprite.x = viewport.worldWidth / 2;
  sprite.y = 320;
  sprite.alpha = 0.5;
  sprite.zIndex = 3;
  viewport.addChild(sprite);
  return sprite;
}

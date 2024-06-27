import { Graphics } from "pixi.js";

export function createOverlay(width, height) {
  const overlay = new Graphics();
  overlay.beginFill(0x000000, 0.5);
  overlay.drawRect(0, 0, width, height);
  overlay.endFill();
  overlay.zIndex = 10;
  return overlay;
}

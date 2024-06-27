import { Container, Sprite, BlurFilter } from "pixi.js";

export function createGradients(worldWidth, worldHeight) {
  let offsetY = 245;

  const blurFilter = new BlurFilter({
    kernelSize: 15,
    quality: 6,
    strength: 20,
  });
  const container = new Container();
  const gradients = ["rectangleBlurTop", "rectangleBlurBottom"].forEach(
    (gradient) => {
      const sprite = Sprite.from(gradient);
      sprite.y = offsetY;
      sprite.x = worldWidth / 2;
      sprite.anchor.set(0.5, 0);
      sprite.filters = blurFilter;
      sprite.alpha = 0.6;
      container.addChild(sprite);
      offsetY = 540;
    }
  );
  container.zIndex = 3;
  return container;
}

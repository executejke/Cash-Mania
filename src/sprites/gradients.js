import { Container, Sprite, BlurFilter } from "pixi.js";

export function createGradients(worldWidth, worldHeight) {
  //   const offsetY = 500;
  let offsetY = 165;

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
      container.addChild(sprite);
      offsetY = 445;
    }
  );
  container.zIndex = 3;
  return container;
}

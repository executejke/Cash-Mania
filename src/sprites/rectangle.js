import anime from "animejs";
import { Container, Sprite, Text } from "pixi.js";

export function createRectangleTryNow(worldWidth, localization) {
  const container = new Container();

  let offsetY = 682;

  const rectangle = Sprite.from("rectangleTryNow");
  rectangle.anchor.set(0.5);

  let lightPosition = [
    { x: -45, y: -20 },
    { x: 45, y: 25 },
  ];

  const text = new Text({
    text: localization.bottomRect,
    style: {
      fontFamily: "komika",
      fontWeight: 400,
      fontSize: 26,
      align: "center",
      fill: 0xffffff,
      dropShadow: true,
      padding: 5,
    },
  });

  text.anchor.set(0.5);
  text.x += text.style.padding;
  text.y += text.style.padding - 2;
  text.resolution = 1.2;

  container.addChild(rectangle, text);

  container.x = worldWidth / 2;
  container.y = 875;
  container.scale.set(1.15, 1.15);

  const lights = ["lightTryNowTop", "lightTryNowBottom"].map((light, i) => {
    const sprite = Sprite.from(light);
    sprite.anchor.set(0.5);
    sprite.x = lightPosition[i].x;
    sprite.y = lightPosition[i].y;
    container.addChild(sprite);
    return sprite;
  });

  container.zIndex = 8;

  anime({
    targets: container.scale,
    x: 1.3,
    y: 1.3,
    duration: 500,
    easing: "linear",
    loop: true,
    direction: "alternate",
  });

  if (text.width > rectangle.width) {
    const scale = text.width / rectangle.width + 0.1;
    rectangle.scale.set(scale, 1);

    lights.forEach((light, i) => {
      light.x = lightPosition[i].x * scale;
    });
  }

  return container;
}

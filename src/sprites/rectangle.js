import anime from "animejs";
import { Container, Sprite, Text } from "pixi.js";

export function createRectangleTryNow(worldWidth) {
  const container = new Container();

  let offsetY = 682;

  const rectangle = Sprite.from("rectangleTryNow");
  rectangle.anchor.set(0.5);

  let lightPosition = [
    { x: -45, y: -20 },
    { x: 45, y: 25 },
  ];

  const text = new Text({
    text: "Попробуй сейчас!",
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

  container.addChild(rectangle, text);

  container.x = worldWidth / 2;
  container.y = offsetY + rectangle.height / 2;

  const lights = ["lightTryNowTop", "lightTryNowBottom"].forEach((light, i) => {
    const sprite = Sprite.from(light);
    sprite.anchor.set(0.5);
    sprite.x = lightPosition[i].x;
    sprite.y = lightPosition[i].y;
    container.addChild(sprite);
  });

  container.zIndex = 4;

  anime({
    targets: container.scale,
    x: 1.1,
    y: 1.1,
    duration: 500,
    easing: "linear",
    loop: true,
    direction: "alternate",
  });
  return container;
}

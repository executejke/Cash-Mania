import { Sprite, Text, Graphics } from "pixi.js";
import { Container } from "pixi.js";
import anime from "animejs/lib/anime.es.js";

export function createMarquee(worldWidth, viewport, appWidth, appHeight) {
  let offsetY = 151;
  const container = new Container();
  const rectangle = Sprite.from("rectangle");
  rectangle.x = worldWidth / 2;
  rectangle.y = rectangle.height / 2 + offsetY;
  rectangle.anchor.set(0.5);
  rectangle.alpha = 0.5;
  container.addChild(rectangle);

  ["lightTop", "lightBottom"].forEach((light) => {
    const sprite = Sprite.from(light);
    sprite.anchor.set(0.5);
    sprite.x = rectangle.x;
    sprite.y = offsetY + 5;
    offsetY += rectangle.height - 1;
    container.addChild(sprite);
  });

  const text = new Text({
    text: "Испытай удачу в новой хайповой игре! Выигрыши до 2000X, RTP 98,9%! Нажимай 'Играть' и пробуй!",
    style: {
      fontFamily: "komika",
      fontSize: 14,
      fontWeight: 400,
      align: "center",
      lineHeight: 14,
      fill: 0xffffff,
      dropShadow: true,
    },
  });
  text.resolution = 1.3;
  text.x = rectangle.x;
  text.y = rectangle.y;
  text.anchor.set(0.5);
  container.addChild(text);

  let mask = new Graphics();
  mask.beginFill(0xffffff);
  mask.drawRect(0, 0, viewport.worldWidth, viewport.worldHeight);
  mask.endFill();
  container.addChild(mask);
  container.mask = mask;

  anime({
    targets: text,
    x: -text.width / 2,
    duration: 5000,
    easing: "linear",
    complete: (anim) => {
      text.x = text.width / 2 + worldWidth;
      anime({
        targets: text,
        x: -text.width / 2,
        duration: 8000,
        easing: "linear",
        loop: true,
      });
    },
  });
  container.zIndex = 4;

  return container;
}

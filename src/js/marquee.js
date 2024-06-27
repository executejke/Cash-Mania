import { Sprite, Container, Graphics, Text } from "pixi.js";
import anime from "animejs/lib/anime.es.js";

export class Marquee {
  constructor(viewport, app, localization) {
    this.marquee = new Container();
    this.viewport = viewport;
    this.app = app;
    this.localization = localization;
    this.createRectangle();
    this.createMarquee();
  }

  createRectangle() {
    let offsetY = 225;
    const container = new Container();
    container.zIndex = 5;
    this.rectangle = Sprite.from("rectangle");
    this.rectangle.scale.x = 0.8;
    this.rectangle.anchor.set(0.5);
    this.rectangle.alpha = 0.8;
    this.rectangle.x = this.viewport.worldWidth / 2;
    this.rectangle.y = this.rectangle.height / 2 + offsetY;
    container.addChild(this.rectangle);

    ["lightTop", "lightBottom"].forEach((light) => {
      const sprite = Sprite.from(light);
      sprite.scale.x = 0.8;
      sprite.anchor.set(0.5);
      sprite.x = this.rectangle.x;
      sprite.y = offsetY + 5;
      offsetY += this.rectangle.height - 1;
      container.addChild(sprite);
    });
    this.viewport.addChild(container);
  }

  createMarquee() {
    const clippingRectangle = new Graphics();
    clippingRectangle.fill({ color: 0x000000, alpha: 1 });
    clippingRectangle.rect(
      this.rectangle.x - this.rectangle.width / 2,
      this.rectangle.y - this.rectangle.height / 2,
      this.rectangle.width,
      this.rectangle.height
    );
    clippingRectangle.endFill();
    this.marquee.addChild(clippingRectangle);

    const text = new Text({
      text: this.localization.marque,
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
    text.x = this.rectangle.x + this.rectangle.width / 2 + text.width / 2;
    text.y = this.rectangle.y;
    text.anchor.set(0.5);
    this.marquee.addChild(text);

    this.marquee.mask = clippingRectangle;
    this.marquee.zIndex = 5;
    this.viewport.addChild(this.marquee);

    const animateText = () => {
      anime({
        targets: text,
        x: this.rectangle.x - this.rectangle.width / 2 - text.width / 2,
        duration: 10000,
        easing: "linear",
        complete: (anim) => {
          text.x = this.rectangle.x + this.rectangle.width / 2 + text.width / 2;
          animateText();
        },
      });
    };

    animateText();
  }
}

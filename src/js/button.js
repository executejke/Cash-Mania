import {
  Sprite,
  Container,
  Text,
  Graphics,
  BlurFilter,
  Texture,
} from "pixi.js";
import anime from "animejs";

export class Button {
  constructor() {}

  createButton(worldWidth) {
    const container = new Container();

    const offsetY = 523;

    const buttonOffTexture = Texture.from("buttonOff");

    const sprite = Sprite.from("button1");
    sprite.anchor.set(0.5);
    sprite.x = worldWidth / 2;
    sprite.y = offsetY + 70;
    sprite.width = 106;
    sprite.height = 106;

    const initialScale = { x: sprite.scale.x, y: sprite.scale.y };
    const hoverScale = { x: initialScale.x * 1.1, y: initialScale.y * 1.1 };

    const text = new Text({
      text: "Играть",
      style: {
        fontFamily: "komika",
        fontSize: 22,
        fontWeight: 400,
        align: "center",
        lineHeight: 14,
        fill: 0xffffff,
        dropShadow: true,
        padding: 5,
      },
    });
    text.anchor.set(0.5);
    text.x = sprite.x + text.style.padding + 4;
    text.y = sprite.y + 5;
    text.zIndex = 2;

    const blur = new Graphics();
    blur.circle(sprite.x, sprite.y, sprite.width / 2 + 5);
    blur.filters = [
      new BlurFilter({
        strength: 6,
        quality: 4,
        resolution: 1,
        kernelSize: 15,
      }),
    ];
    blur.fill(0xffffff);

    const outline = new Graphics();
    outline.circle(sprite.x, sprite.y, sprite.width / 2 + 3);
    outline.fill(0xffffff);

    container.addChild(outline, blur, sprite, text);

    container.interactive = true;
    container.cursor = "pointer";

    container.on("pointerover", () => this.onHover(sprite, hoverScale));
    container.on("pointerout", () => this.onOut(sprite, initialScale));
    container.on("pointerdown", () =>
      this.onClick(sprite, initialScale, buttonOffTexture, text)
    );

    container.zIndex = 6;

    this.button = container;
    return container;
  }

  onHover(sprite, hoverScale) {
    anime({
      targets: sprite.scale,
      x: hoverScale.x,
      y: hoverScale.y,
      duration: 150,
      easing: "linear",
    });
  }

  onOut(sprite, initialScale) {
    anime({
      targets: sprite.scale,
      x: initialScale.x,
      y: initialScale.y,
      duration: 150,
      easing: "linear",
    });
  }

  onClick(sprite, initialScale, buttonOffTexture, text) {
    const newSprite = new Sprite(buttonOffTexture);
    newSprite.anchor.set(0.5);
    newSprite.x = sprite.x;
    newSprite.y = sprite.y;
    newSprite.alpha = 0;

    sprite.parent.addChild(newSprite);

    anime({
      targets: sprite.scale,
      x: initialScale.x,
      y: initialScale.y,
      duration: 150,
      easing: "linear",
      complete: () => {
        anime({
          targets: text,
          alpha: 0.5,
          duration: 300,
          easing: "linear",
        });

        anime({
          targets: newSprite,
          alpha: 1,
          duration: 300,
          easing: "linear",
          complete: () => {
            sprite.texture = buttonOffTexture;
            sprite.alpha = 1;
            console.log(newSprite.scale, sprite.scale);
          },
        });
      },
    });
  }
}

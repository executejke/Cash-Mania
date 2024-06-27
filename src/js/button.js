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
  constructor(viewport, localization) {
    this.viewport = viewport;
    this.localization = localization;
    this.createButton();
    return this.container;
  }

  createButton() {
    this.container = new Container();
    let scale;

    const offsetY = 523;

    const buttonOffTexture = Texture.from("buttonOff");

    this.sprite = Sprite.from("button1");
    this.sprite.anchor.set(0.5);
    this.sprite.x = this.viewport.worldWidth / 2;
    this.sprite.y = offsetY + 180;
    this.sprite.width = 106;
    this.sprite.height = 106;
    scale = this.sprite.scale;

    this.text = new Text({
      text: this.localization.button,
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
    this.text.anchor.set(0.5);
    this.text.x = this.sprite.x + this.text.style.padding + 4;
    this.text.y = this.sprite.y + 5;
    this.text.zIndex = 2;

    if (this.text.width >= this.sprite.width) {
      scale = this.text.width / this.sprite.width;
      this.sprite.scale.set(scale);
    }

    const initialScale = { x: this.sprite.scale.x, y: this.sprite.scale.y };
    const hoverScale = { x: initialScale.x * 1.1, y: initialScale.y * 1.1 };

    this.createGraphics();

    this.container.interactive = true;
    this.container.cursor = "pointer";

    this.container.on("pointerover", () =>
      this.onHover(this.sprite, hoverScale)
    );
    this.container.on("pointerout", () =>
      this.onOut(this.sprite, initialScale)
    );
    this.container.on("pointerdown", () =>
      this.onClick(this.sprite, initialScale, buttonOffTexture, this.text)
    );

    this.container.zIndex = 6;

    if (this.text.width >= this.sprite.width) {
      const scale = this.text.width / this.sprite.width;
      this.sprite.scale.set(scale);
    }
    console.log(this.sprite.width);
  }

  createGraphics() {
    const blur = new Graphics();
    blur.circle(this.sprite.x, this.sprite.y, this.sprite.width / 2 + 5);
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
    outline.circle(this.sprite.x, this.sprite.y, this.sprite.width / 2 + 3);
    outline.fill(0xffffff);

    this.container.addChild(outline, blur, this.sprite, this.text);
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
    newSprite.scale.set(sprite.scale.x + 0.1, sprite.scale.y + 0.1);

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
          },
        });
      },
    });
  }
}

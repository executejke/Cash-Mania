import { Color, Container, FillGradient, Sprite, Text } from "pixi.js";

export class Banknote {
  constructor(viewport, aliasPic, first, localization) {
    this.viewport = viewport;
    this.aliasPic = aliasPic;
    this.first = first;
    this.localization = localization;
    this.container = new Container();
    this.container.zIndex = 6;
    this.container.scale.set(1.3, 1.3);
    this.container.alpha = 0;
    this.container.x = this.viewport.worldWidth / 2;
    this.container.y = -10;
    this.sprites = [];
    this.texts = [];
    this.createBoomEffect();
    this.createBanknote(this.first);
    this.createParticle();
    this.createBlur();
    this.addToViewport();
  }

  createBanknote(firstBanknote) {
    let offsetY = 30;
    let angle = 180;
    const textContainer = new Container();
    const banknote = new Container();
    const banknoteSprite = Sprite.from(this.aliasPic);
    banknoteSprite.anchor.set(0.5, 0);
    this.aliasPic === "banknote"
      ? (banknoteSprite.y = 307)
      : (banknoteSprite.y = 307);
    banknote.addChild(banknoteSprite);
    this.sprites.push(banknoteSprite);

    const fill = new FillGradient(0, 0, 0, 36 * 1.7 * 7);

    const colors = [0xff7c90, 0xb10020].map((color) =>
      Color.shared.setValue(color).toNumber()
    );

    colors.forEach((number, index) => {
      const ratio = index / colors.length;

      fill.addColorStop(ratio, number);
    });

    if (firstBanknote) {
      ["stars", "stars"].forEach((stars, index) => {
        const sprite = Sprite.from(stars);
        sprite.anchor.set(0.5, 0.5);

        sprite.x = banknoteSprite.x;

        sprite.y =
          banknoteSprite.y +
          banknoteSprite.height / 2 +
          (index === 0 ? -offsetY : offsetY);

        sprite.angle = angle;
        angle = 0;
        banknote.addChild(sprite);
        this.sprites.push(sprite);
      });

      const value = new Text({
        text: this.localization.banknoteNumber,
        style: {
          fontFamily: "komika",
          fontSize: 36,
          fill: { fill },
          stroke: { color: "#FFF2D0", width: 2, join: "round" },
          dropShadow: {
            color: "#000000",
            blur: 4,
            angle: Math.PI / 6,
            distance: 6,
          },
          align: "center",
          wordWrap: true,
          wordWrapWidth: 440,
        },
      });

      value.x = banknoteSprite.x + 5;
      value.y = banknoteSprite.y + banknoteSprite.height / 2 - 10;
      value.resolution = 1.3;
      value.anchor.set(0.5, 0.5);
      textContainer.addChild(value);
      this.sprites.push(value);

      const text = new Text({
        text: this.localization.banknoteText,
        style: {
          fontFamily: "komika",
          fontSize: 13,

          fill: { fill },
          stroke: { color: "#FFF2D0", width: 2, join: "round" },
          dropShadow: {
            color: "#000000",
            blur: 4,
            angle: Math.PI / 6,
            distance: 6,
          },
          align: "center",
          wordWrap: true,
          wordWrapWidth: 440,
          padding: 5,
        },
      });

      text.x = banknoteSprite.x + text.style.padding * 2;
      text.y = banknoteSprite.y + banknoteSprite.height / 2 + 25;
      text.resolution = 1.3;
      text.anchor.set(0.5, 0.5);
      textContainer.addChild(text);
      this.sprites.push(text);
    } else {
      const character = Sprite.from("character");
      character.x = banknoteSprite.x;
      character.y = banknoteSprite.y + banknoteSprite.height / 2 - 20;
      character.anchor.set(0.5, 0.5);
      banknote.addChild(character);
      this.sprites.push(character);

      const stars = Sprite.from("stars");
      stars.x = banknoteSprite.x + 5;
      stars.y = banknoteSprite.y + banknoteSprite.height / 2 + offsetY + 10;
      stars.anchor.set(0.5, 0.5);
      banknote.addChild(stars);
      this.sprites.push(stars);

      const textMultiplier = new Text({
        text: this.localization.banknoteMultiplier,
        style: {
          fontFamily: "komika",
          fontSize: 36,
          fill: { fill },
          stroke: { color: "#FFF2D0", width: 2, join: "round" },
          dropShadow: {
            color: "#000000",
            blur: 4,
            angle: Math.PI / 6,
            distance: 6,
          },
          padding: 5,
          align: "center",
          wordWrap: true,
          wordWrapWidth: 440,
        },
      });
      textMultiplier.x = banknoteSprite.x - 5;
      textMultiplier.y = banknoteSprite.y + banknoteSprite.height / 2 + 10;
      textMultiplier.anchor.set(0.5);
      textContainer.addChild(textMultiplier);
      this.texts.push(textMultiplier);

      const value = new Text({
        text: this.localization.banknoteMultiplierValue,
        style: {
          fontFamily: "komika",
          fontSize: 54,
          fill: { fill },
          stroke: { color: "#FFF2D0", width: 2, join: "round" },
          dropShadow: {
            color: "#000000",
            blur: 4,
            angle: Math.PI / 6,
            distance: 6,
          },
          padding: 5,
          align: "left",
          wordWrap: true,
          wordWrapWidth: 440,
        },
      });
      value.x = banknoteSprite.x;
      value.y = banknoteSprite.y + banknoteSprite.height / 2;
      value.anchor.set(0, 0.5);
      textContainer.addChild(value);
      this.texts.push(value);
    }
    banknote.addChild(textContainer);
    this.container.addChild(banknote);
    this.sprites.push(banknoteSprite);
  }

  createParticle() {
    ["particles", "particlesBottom"].forEach((particle, index) => {
      const sprite = Sprite.from(particle);
      sprite.zIndex = 1;
      sprite.anchor.set(0.5, 0);
      index === 1 ? (sprite.y = 645) : (sprite.y = 0);
      this.container.addChild(sprite);
      this.sprites.push(sprite);
    });
  }

  createBoomEffect() {
    const sprite = Sprite.from("boom");
    sprite.anchor.set(0.5);
    sprite.y = 310 + 10;
    sprite.alpha = 0.7;
    this.container.addChild(sprite);
    this.sprites.push(sprite);
  }

  createBlur() {
    this.blur = Sprite.from("blur");
    this.blur.anchor.set(0.5);
    this.blur.x = this.viewport.worldWidth / 2;
    this.blur.y = 450;
    this.blur.alpha = 0.5;
    this.blur.zIndex = 2;
    this.blur.name = "blur";
    this.viewport.addChild(this.blur);
    this.sprites.push(this.blur);
  }

  removeBanknote() {
    while (this.container.children.length > 0) {
      this.container.removeChildAt(0);
    }
    this.sprites = [];
    this.texts = [];
    this.viewport.removeChild(this.viewport.getChildByName("blur"));
  }

  addToViewport() {
    this.viewport.addChild(this.container);
  }
}

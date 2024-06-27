import { Container, Sprite, Text, Graphics } from "pixi.js";
import cookieManager from "./cookieManager";

export class PopupCTA {
  constructor(viewport, localization) {
    this.viewport = viewport;
    this.localization = localization;
    this.sprites = [];
    this.texts = [];
    this.container = new Container();
    this.container.zIndex = 7;
    this.container.alpha = 0;
    this.createSprite();
    this.createText();
    this.createButton();
    this.createOverlay();
    this.viewport.addChild(this.container);
  }

  createSprite() {
    this.popupSprite = Sprite.from("popupRectangle");
    this.popupSprite.anchor.set(0.5, 0);
    this.popupSprite.x = this.viewport.worldWidth / 2;
    this.popupSprite.y = 325;
    this.popupSprite.zIndex = 1;
    this.popupSprite.scale.set(1.15, 1.15);
    this.sprites.push(this.popupSprite);
    this.container.addChild(this.popupSprite);
  }

  createButton() {
    const button = new Container();

    const sprite = Sprite.from("popupButton");
    sprite.anchor.set(0.5);
    sprite.x = this.viewport.worldWidth / 2;
    sprite.y = 0;

    const buttonText = new Text({
      text: this.localization.popupSecondButton,
      style: {
        fontFamily: "komika",
        fontSize: 17,
        fontWeight: 400,
        align: "center",
        lineHeight: 30,
        fill: 0x340f71,
        padding: 5,
      },
    });

    buttonText.anchor.set(0.5);
    buttonText.x = sprite.x + buttonText.style.padding;
    buttonText.y = 0;
    buttonText.zIndex = 2;
    buttonText.resolution = 1.2;

    button.y = this.popupSprite.y + this.popupSprite.height - 70;
    button.zIndex = 2;
    button.addChild(sprite, buttonText);

    if (buttonText.width >= sprite.width - 20) {
      const scale = buttonText.width / sprite.width + 0.4;
      sprite.scale.set(scale, 1);
    }

    button.interactive = true;
    button.cursor = "pointer";

    button.on("pointerdown", () => {
      cookieManager.setCookie("gapmania", "1613", {
        secure: true,
        "max-age": 30 * 24 * 60 * 60,
      });
      window.location.href = cookieManager.genUrl();
    });
    this.sprites.push(button);
    this.container.addChild(button);
  }

  createOverlay() {
    const overlay = new Graphics();
    overlay.beginFill(0x1a1a1a, 0.5);
    overlay.drawRect(0, 0, this.viewport.worldWidth, this.viewport.worldHeight);
    overlay.endFill();
    overlay.zIndex = 0;
    this.container.addChild(overlay);
    this.sprites.push(overlay);
  }

  createText() {
    const congratulation = new Text({
      text: this.localization.popupSecondWin,
      style: {
        fontFamily: "komika",
        fontSize: 20,
        fontWeight: 400,
        align: "center",
        lineHeight: 25,
        fill: 0xffffff,
        dropShadow: true,
        padding: 5,
      },
    });

    const value = new Text({
      text: this.localization.popupSecondFreeSpinsPlusBonus,
      style: {
        fontFamily: "komika",
        fontSize: 20,
        fontWeight: 400,
        align: "center",
        lineHeight: 25,
        fill: 0xffffff,
        dropShadow: true,
        padding: 5,
      },
    });

    const winFreeSpinText = new Text({
      text: this.localization.popupSecondTake,
      style: {
        fontFamily: "komika",
        fontSize: 18,
        fontWeight: 400,
        align: "center",
        lineHeight: 30,
        fill: 0xffffff,
        dropShadow: true,
        padding: 5,
        wordWrap: true,
        wordWrapWidth: this.popupSprite.width - 75,
      },
    });

    const maxTextWidth = Math.max(congratulation.width, value.width);

    if (maxTextWidth >= this.popupSprite.width - 50) {
      const initialScaleX = this.popupSprite.scale.x;
      const scale =
        (maxTextWidth / (this.popupSprite.width - 50)) * initialScaleX + 0.2;
      this.popupSprite.scale.set(scale, 1.15);
    }

    const maxTextHeight = 40;
    if (winFreeSpinText.height > maxTextHeight) {
      const additionalHeight = winFreeSpinText.height - maxTextHeight;
      const scaleY = 1 + additionalHeight / this.popupSprite.height;
      this.popupSprite.scale.y *= scaleY;
    }

    congratulation.anchor.set(0.5, 0);
    congratulation.x =
      this.viewport.worldWidth / 2 + congratulation.style.padding + 2;
    congratulation.y = 375;
    congratulation.zIndex = 2;
    congratulation.resolution = 1.2;

    value.anchor.set(0.5, 0);
    value.x = this.viewport.worldWidth / 2 + congratulation.style.padding + 2;
    value.y = 410;
    value.zIndex = 2;
    value.resolution = 1.2;

    winFreeSpinText.anchor.set(0.5, 0);
    winFreeSpinText.x =
      this.viewport.worldWidth / 2 + congratulation.style.padding + 2;
    winFreeSpinText.y = 475;
    winFreeSpinText.zIndex = 2;
    winFreeSpinText.resolution = 1.2;
    this.texts.push(congratulation, winFreeSpinText, value);
    this.container.addChild(congratulation, winFreeSpinText, value);
  }

  removePopup() {
    this.sprites.forEach((sprite) => {
      this.container.removeChild(sprite);
    });
    this.texts.forEach((text) => {
      this.container.removeChild(text);
    });
  }
}

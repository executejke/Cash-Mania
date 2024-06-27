import { Container, Sprite, Text, Graphics } from "pixi.js";

export class Popup {
  constructor(viewport, elements, gameContainer, eventEmitter, localization) {
    this.viewport = viewport;
    this.elements = elements;
    this.gameContainer = gameContainer;
    this.eventEmitter = eventEmitter;
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
    this.newElements = [
      "elem1",
      "elem10",
      "elem11",
      "elem12",
      "elem5",
      "elem13",
      "elem7",
      "elem14",
      "elem15",
    ];
    this.onPopupButtonClicked = null;
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
      text: this.localization.popupFirstButton,
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
      this.removePopup();
      this.eventEmitter.emit("replaceElements", this.newElements);
      this.eventEmitter.emit("removeBanknote");
      this.eventEmitter.emit("changeHideSpriteIndex", 0);
      if (this.onPopupButtonClicked) {
        this.onPopupButtonClicked();
      }
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
      text: this.localization.popupFirstCongratulation,
      style: {
        fontFamily: "komika",
        fontSize: 26,
        fontWeight: 400,
        align: "center",
        lineHeight: 14,
        fill: 0xffffff,
        dropShadow: true,
        padding: 5,
      },
    });

    const winFreeSpinText = new Text({
      text: this.localization.popupFirstFreeSpins,
      style: {
        fontFamily: "komika",
        fontSize: 18,
        fontWeight: 400,
        align: "center",
        lineHeight: 25,
        fill: 0xffffff,
        dropShadow: true,
        padding: 5,
        wordWrap: true,
        wordWrapWidth: this.popupSprite.width - 50,
      },
    });

    const maxTextWidth = Math.max(congratulation.width, winFreeSpinText.width);

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

    winFreeSpinText.anchor.set(0.5, 0);
    winFreeSpinText.x =
      this.viewport.worldWidth / 2 + congratulation.style.padding + 2;
    winFreeSpinText.y = 450;
    winFreeSpinText.zIndex = 2;
    winFreeSpinText.resolution = 1.2;
    this.texts.push(congratulation, winFreeSpinText);
    this.container.addChild(congratulation, winFreeSpinText);
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

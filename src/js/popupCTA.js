import { Container, Sprite, Text } from "pixi.js";

export class PopupCTA {
  constructor(viewport) {
    this.viewport = viewport;
    this.sprites = [];
    this.texts = [];
    this.container = new Container();
    this.container.zIndex = 30;
    this.container.alpha = 0;
    this.createSprite();
    this.createText();
    this.createButton();
    this.viewport.addChild(this.container);
  }

  createSprite() {
    const sprite = Sprite.from("popupRectangle");
    sprite.anchor.set(0.5, 0);
    sprite.x = this.viewport.worldWidth / 2;
    sprite.y = 273;
    this.sprites.push(sprite);
    this.container.addChild(sprite);
  }

  createButton() {
    const button = new Container();

    const sprite = Sprite.from("popupCTAButton");
    sprite.anchor.set(0.5, 0);
    sprite.x = this.viewport.worldWidth / 2;
    sprite.y = 412;

    const buttonText = new Text({
      text: "Забрать бонус",
      style: {
        fontFamily: "komika",
        fontSize: 17,
        fontWeight: 400,
        align: "center",
        lineHeight: 30,
        fill: 0x340f71,
        // dropShadow: true,
        padding: 5,
        wordWrap: true,
        wordWrapWidth: 170,
      },
    });

    buttonText.anchor.set(0.5, 0);
    buttonText.x = this.viewport.worldWidth / 2 + buttonText.style.padding + 2;
    buttonText.y = 420;
    buttonText.zIndex = 2;
    buttonText.resolution = 1.2;

    button.addChild(sprite, buttonText);

    button.interactive = true;
    button.cursor = "pointer";

    button.on("pointerdown", () => {
      console.log(1);
    });
    this.sprites.push(button);
    this.container.addChild(button);
  }

  createText() {
    const congratulation = new Text({
      text: "Вы выиграли бонус $300 + 100 фриспинов!",
      style: {
        fontFamily: "komika",
        fontSize: 20,
        fontWeight: 400,
        align: "center",
        lineHeight: 30,
        fill: 0xffffff,
        dropShadow: true,
        padding: 5,
        wordWrap: true,
        wordWrapWidth: 270,
      },
    });

    const winFreeSpinText = new Text({
      text: "Успей забрать, пока не сгорел!",
      style: {
        fontFamily: "komika",
        fontSize: 16,
        fontWeight: 400,
        align: "center",
        lineHeight: 30,
        fill: 0xffffff,
        dropShadow: true,
        padding: 5,
        wordWrap: true,
        wordWrapWidth: 300,
      },
    });

    congratulation.anchor.set(0.5, 0);
    congratulation.x =
      this.viewport.worldWidth / 2 + congratulation.style.padding + 2;
    congratulation.y = 303;
    congratulation.zIndex = 2;
    congratulation.resolution = 1.2;

    winFreeSpinText.anchor.set(0.5, 0);
    winFreeSpinText.x =
      this.viewport.worldWidth / 2 + congratulation.style.padding + 2;
    winFreeSpinText.y = 373;
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

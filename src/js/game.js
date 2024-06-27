import { Sprite, Container } from "pixi.js";
import { Button } from "./button";
import { Banknote } from "./banknote";
import { Popup } from "./popup";
import { PopupCTA } from "./popupCTA";
import { EventEmitter } from "eventemitter3";
import anime from "animejs";

export class Game extends EventEmitter {
  constructor(viewport, localization) {
    super();
    this.viewport = viewport;
    this.localization = localization;
    this.button = new Button(viewport, this.localization);
    this.rowCount = 3;
    this.offsetsX = [0, 121, 243];
    this.offsetY = 250;
    this.rowHeight = 145;
    this.container = new Container();
    this.container.zIndex = 2;
    this.startX = 400 - this.offsetsX[0];
    this.elements = [
      "elem1",
      "elem2",
      "elem3",
      "elem4",
      "elem5",
      "elem6",
      "elem7",
      "elem8",
      "elem9",
    ];
    this.hiddenElements = ["elemWin", "elemWin2"];
    this.hiddenSprites = [];
    this.sprites = [];
    this.positions = [];
    this.clickCount = 0;
    this.hideSpriteIndex = 6;

    this.viewport.addChild(this.createElements());
    this.viewport.addChild(this.button);
    this.buttonHandler();

    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.on("replaceElements", (newElements) =>
      this.replaceElements(newElements)
    );
    this.on("removeBanknote", () => this.banknote?.removeBanknote());
    this.on("startSecondAnimation", () => this.runSecondAnimationSequence());
    this.on("animateNewElements", (newElements) => {
      this.animateNewElements(newElements).then(() => {
        this.emit("startSecondAnimation");
      });
    });
    this.on("changeHideSpriteIndex", (newIndex) => {
      this.hideSpriteIndex = newIndex;
    });
  }

  createElements(elements = this.elements) {
    this.hiddenSprites = [];
    this.sprites = [];

    elements.forEach((element, index) => {
      const sprite = Sprite.from(element);
      sprite.anchor.set(0.5, 0);
      sprite.zIndex = 1;
      sprite.scale.set(1.2);

      const row = Math.floor(index / this.rowCount);
      const col = index % this.rowCount;

      sprite.x = this.startX + this.offsetsX[col];
      sprite.y = this.offsetY + row * this.rowHeight;

      this.container.addChild(sprite);
      this.sprites.push(sprite);
      this.positions.push({ x: sprite.x, y: sprite.y });

      if (index === 3) {
        const hiddenSprite = Sprite.from(this.hiddenElements[this.clickCount]);
        hiddenSprite.anchor.set(0.5, 0);
        hiddenSprite.x = sprite.x;
        hiddenSprite.y = sprite.y;
        hiddenSprite.scale = sprite.scale;
        hiddenSprite.zIndex = 0;
        hiddenSprite.alpha = 0;

        this.hiddenSprites.push(hiddenSprite);
        this.container.addChild(hiddenSprite);
      }
    });

    return this.container;
  }

  updateAnimations() {
    this.firstAnimation = {
      first: [
        { sprite: this.sprites[3], x: 400, y: 250 },
        { sprite: this.sprites[0], x: 400, y: 540 },
      ],
      second: [
        { sprite: this.sprites[2], x: 643, y: 540 },
        { sprite: this.sprites[5], x: 643, y: 250 },
        { sprite: this.sprites[8], x: 643, y: 395 },
      ],
      third: [
        { sprite: this.sprites[1], x: 521, y: 395 },
        { sprite: this.sprites[7], x: 521, y: 250 },
        { sprite: this.sprites[4], x: 521, y: 540 },
      ],
    };

    this.secondAnimation = {
      first: [
        { sprite: this.sprites[3], x: 400, y: 540 },
        { sprite: this.sprites[6], x: 400, y: 250 },
      ],
      second: [
        { sprite: this.sprites[1], x: 521, y: 540 },
        { sprite: this.sprites[4], x: 521, y: 250 },
        { sprite: this.sprites[7], x: 521, y: 395 },
      ],
      third: [
        { sprite: this.sprites[2], x: 643, y: 395 },
        { sprite: this.sprites[5], x: 643, y: 540 },
        { sprite: this.sprites[8], x: 643, y: 250 },
      ],
    };
  }

  buttonHandler() {
    this.button.on("pointerdown", () => {
      this.button.interactive = false;
      this.runFirstAnimationSequence().then(() => {
        this.clickCount++;
      });
    });
    this.button.eventMode = "static";
  }

  runFirstAnimationSequence() {
    this.updateAnimations();
    return this.animateSprites(this.firstAnimation.first)
      .then(() => this.animateSprites(this.firstAnimation.second))
      .then(() => this.animateSprites(this.firstAnimation.third))
      .then(() => {
        this.banknote = new Banknote(
          this.viewport,
          "banknote",
          true,
          this.localization
        );
        return anime({
          targets: this.banknote.container,
          alpha: 1,
          duration: 500,
          easing: "linear",
        }).finished;
      })
      .then(() => {
        this.popup = new Popup(
          this.viewport,
          this.sprites,
          this.container,
          this,
          this.localization
        );
        this.popup.onPopupButtonClicked = () => {
          this.emit("animateNewElements", this.popup.newElements);
        };
        return anime({
          targets: this.popup.container,
          alpha: 1,
          duration: 1000,
          easing: "easeInBack",
        }).finished;
      });
  }

  runSecondAnimationSequence() {
    this.updateAnimations();
    return this.animateSprites(this.secondAnimation.first)
      .then(() => this.animateSprites(this.secondAnimation.second))
      .then(() => this.animateSprites(this.secondAnimation.third))
      .then(() => {
        this.banknote = new Banknote(
          this.viewport,
          "banknoteX",
          false,
          this.localization
        );
        return anime({
          targets: this.banknote.container,
          alpha: 1,
          duration: 500,
          easing: "linear",
        }).finished;
      })
      .then(() => {
        this.popupCTA = new PopupCTA(this.viewport, this.localization);
        return anime({
          targets: this.popupCTA.container,
          alpha: 1,
          duration: 1000,
          easing: "easeInBack",
        }).finished;
      });
  }

  animateSprites(animations) {
    return new Promise((resolve) => {
      let isAnimated = false;
      let completedCount = 0;

      animations.forEach((animation) => {
        anime({
          targets: animation.sprite,
          x: animation.x,
          y: animation.y,
          duration: 800,
          easing: "easeInBack",
          update: (anim) => {
            if (anim.currentTime >= 400 && !isAnimated) {
              isAnimated = true;
              anime({
                targets: this.hiddenSprites[0],
                alpha: 1,
                duration: 200,
                easing: "linear",
              });
              anime({
                targets: this.sprites[this.hideSpriteIndex],
                alpha: 0,
                duration: 400,
                easing: "easeInBack",
              });
            }
          },
          complete: () => {
            completedCount += 1;
            if (completedCount === animations.length) {
              resolve();
            }
          },
        });
      });
    });
  }

  animateNewElements(newElements) {
    return new Promise((resolve) => {
      this.replaceElements(newElements);

      this.sprites.forEach((sprite, index) => {
        const row = Math.floor(index / this.rowCount);
        const col = index % this.rowCount;

        const targetX = this.startX + this.offsetsX[col];
        const targetY = this.offsetY + row * this.rowHeight;

        sprite.alpha = 0;
        sprite.x =
          targetX > this.viewport.worldWidth / 2
            ? targetX + 100
            : targetX - 100;
        sprite.y =
          targetY > this.viewport.worldHeight / 2
            ? targetY + 100
            : targetY - 100;

        anime({
          targets: sprite,
          alpha: 1,
          x: targetX,
          y: targetY,
          duration: 1000,
          easing: index % 2 === 0 ? "easeOutExpo" : "easeInBack",
          complete: () => {
            if (index === this.sprites.length - 1) {
              resolve();
            }
          },
        });
      });
    });
  }

  replaceElements(newElements) {
    this.sprites.forEach((sprite) => {
      this.container.removeChild(sprite);
    });

    const hiddenSprite = this.hiddenSprites[0];
    this.container.removeChild(hiddenSprite);

    this.hiddenSprites = [];
    this.sprites = [];

    this.createElements(newElements);
    this.updateAnimations();
  }
}

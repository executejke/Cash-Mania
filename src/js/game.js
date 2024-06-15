import { Sprite, Container } from "pixi.js";
import { Button } from "./button";
import anime from "animejs";
import { Banknote } from "./banknote";
import { createBlur } from "../sprites/blur";
import { Popup } from "./popup";
import { EventEmitter } from "eventemitter3";
import { PopupCTA } from "./popupCTA";

export class Game extends EventEmitter {
  constructor(viewport) {
    super(); // Вызов конструктора EventEmitter
    this.viewport = viewport;
    this.button = new Button().createButton(viewport.worldWidth);
    this.rowCount = 3; // Количество элементов в ряду
    this.startX = 65; // Начальный отступ по X для первого элемента
    this.offsetsX = [0, 85, 185]; // Отступы для каждого элемента в ряду
    this.offsetY = 188; // Начальный отступ по Y
    this.rowHeight = 120; // Высота каждого ряда
    this.container = new Container();
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
    this.hiddenSprites = [];
    this.sprites = [];
    this.positions = [
      { x: 107.5, y: 188 },
      { x: 200, y: 188 },
      { x: 292, y: 188 },
      { x: 107.5, y: 308 },
      { x: 200, y: 308 },
      { x: 293, y: 308 },
      { x: 107.5, y: 428 },
      { x: 200, y: 428 },
      { x: 293, y: 428 },
    ];
    this.clickCount = 0; // Счетчик кликов
    this.hiddenElements = ["elemWin", "elemWin2"];
    this.viewport.addChild(this.createElements());
    this.viewport.addChild(this.button);
    this.buttonHandler();

    this.firstAnimation = {
      first: [
        { sprite: this.sprites[3], x: 107.5, y: 188 },
        { sprite: this.sprites[0], x: 107.5, y: 428 },
      ],
      second: [
        { sprite: this.sprites[2], x: 293, y: 428 },
        { sprite: this.sprites[5], x: 292, y: 188 },
        { sprite: this.sprites[8], x: 293, y: 308 },
      ],
      third: [
        { sprite: this.sprites[1], x: 200, y: 308 },
        { sprite: this.sprites[7], x: 200, y: 188 },
        { sprite: this.sprites[4], x: 200, y: 428 },
      ],
    };

    this.secondAnimation = {
      first: [
        { sprite: this.sprites[4], x: 150, y: 250 },
        { sprite: this.sprites[1], x: 150, y: 450 },
      ],
      second: [
        { sprite: this.sprites[3], x: 350, y: 450 },
        { sprite: this.sprites[6], x: 350, y: 250 },
        { sprite: this.sprites[7], x: 350, y: 350 },
      ],
      third: [
        { sprite: this.sprites[0], x: 250, y: 350 },
        { sprite: this.sprites[2], x: 250, y: 250 },
        { sprite: this.sprites[5], x: 250, y: 450 },
      ],
    };

    this.hideSpriteIndex = 6;

    // Подписка на событие замены элементов
    this.on("replaceElements", (newElements) =>
      this.replaceElements(newElements)
    );

    // Подписка на событие удаления спрайтов Banknote
    this.on("removeBanknote", () => {
      if (this.banknote) {
        this.banknote.removeBanknote();
      }
    });

    // Подписка на событие запуска второй анимации
    this.on("startSecondAnimation", () => {
      this.runSecondAnimationSequence();
    });

    // Подписка на событие анимации появления элементов
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

      const row = Math.floor(index / this.rowCount);
      const col = index % this.rowCount;

      sprite.x = this.startX + this.offsetsX[col] + sprite.width / 2;
      sprite.y = this.offsetY + row * this.rowHeight;

      this.container.addChild(sprite);
      this.sprites.push(sprite);
      this.positions.push({ x: sprite.x, y: sprite.y });

      if (index === 3) {
        const hiddenSprite = Sprite.from(this.hiddenElements[this.clickCount]);
        hiddenSprite.anchor.set(0.5, 0);
        hiddenSprite.x = sprite.x;
        hiddenSprite.y = sprite.y;
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
        { sprite: this.sprites[3], x: 107.5, y: 188 },
        { sprite: this.sprites[0], x: 107.5, y: 428 },
      ],
      second: [
        { sprite: this.sprites[2], x: 293, y: 428 },
        { sprite: this.sprites[5], x: 292, y: 188 },
        { sprite: this.sprites[8], x: 293, y: 308 },
      ],
      third: [
        { sprite: this.sprites[1], x: 200, y: 308 },
        { sprite: this.sprites[7], x: 200, y: 188 },
        { sprite: this.sprites[4], x: 200, y: 428 },
      ],
    };

    this.secondAnimation = {
      first: [
        { sprite: this.sprites[3], x: 107.5, y: 428 },
        { sprite: this.sprites[6], x: 107.5, y: 188 },
      ],
      second: [
        { sprite: this.sprites[1], x: 200, y: 428 },
        { sprite: this.sprites[4], x: 200, y: 188 },
        { sprite: this.sprites[7], x: 200, y: 308 },
      ],
      third: [
        { sprite: this.sprites[2], x: 293, y: 308 },
        { sprite: this.sprites[5], x: 293, y: 428 },
        { sprite: this.sprites[8], x: 293, y: 188 },
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
        this.banknote = new Banknote(this.viewport, "banknote");
        return anime({
          targets: this.banknote.container,
          alpha: 1,
          duration: 500,
          easing: "linear",
        }).finished;
      })
      .then(() => {
        // Анимация появления попапа
        this.popup = new Popup(
          this.viewport,
          this.sprites,
          this.container,
          this
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
        this.banknote = new Banknote(this.viewport, "banknoteCash");
        return anime({
          targets: this.banknote.container,
          alpha: 1,
          duration: 500,
          easing: "linear",
        }).finished;
      })
      .then(() => {
        // Анимация появления попапа
        this.popupCTA = new PopupCTA(this.viewport);

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
      const hiddenSprites = this.hiddenSprites;
      const sprites = this.sprites;
      let completedCount = 0;

      animations.forEach((animation) => {
        anime({
          targets: animation.sprite,
          x: animation.x,
          y: animation.y,
          duration: 800, // Длительность анимации в миллисекундах
          easing: "easeInBack", // Временная функция
          update: (anim) => {
            if (anim.currentTime >= 400 && !isAnimated) {
              isAnimated = true;
              anime({
                targets: hiddenSprites[0],
                alpha: 1,
                duration: 200, // Длительность анимации альфы
                easing: "linear", // Временная функция для анимации альфы
              });
              anime({
                targets: sprites[this.hideSpriteIndex],
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

      // Анимация появления новых элементов
      this.sprites.forEach((sprite, index) => {
        const targetX =
          this.startX + this.offsetsX[index % this.rowCount] + sprite.width / 2;
        const targetY =
          this.offsetY + Math.floor(index / this.rowCount) * this.rowHeight;

        // Установка начальных позиций
        sprite.alpha = 0;
        sprite.x =
          targetX > this.viewport.worldWidth / 2
            ? targetX + 100
            : targetX - 100;
        sprite.y =
          targetY > this.viewport.worldHeight / 2
            ? targetY + 100
            : targetY - 100;

        // Анимация
        anime({
          targets: sprite,
          alpha: 1,
          x: targetX,
          y: targetY,
          duration: 1000,
          easing: index % 2 === 0 ? "easeOutExpo" : "easeInBack",
          complete: () => {
            resolve();
          },
        });
      });
    });
  }

  replaceElements(newElements) {
    // Удаление старых элементов
    this.sprites.forEach((sprite) => {
      this.container.removeChild(sprite);
    });
    const hiddenSprite = this.hiddenSprites[0];
    this.container.removeChild(hiddenSprite);
    this.hiddenSprites = [];
    this.sprites = [];

    // Создание новых элементов
    this.createElements(newElements);
    this.updateAnimations(); // Обновление анимационных объектов
  }

  animateElements() {}
}

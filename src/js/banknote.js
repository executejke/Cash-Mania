import { Container, Sprite } from "pixi.js";

export class Banknote {
  constructor(viewport, aliasPic) {
    this.viewport = viewport;
    this.aliasPic = aliasPic;
    this.container = new Container();
    this.container.zIndex = 15;
    this.container.alpha = 0;
    this.sprites = [];
    this.createBoomEffect();
    this.createSprite();
    this.createParticle();
    this.addToViewport();
  }

  createSprite() {
    const sprite = Sprite.from(this.aliasPic);
    sprite.anchor.set(0.5, 0);
    sprite.x = this.viewport.worldWidth / 2 + 2;
    sprite.alpha = 1;
    this.aliasPic === "banknote" ? (sprite.y = 294) : (sprite.y = 305);
    // sprite.y = 310 - 16;
    this.container.addChild(sprite);
    this.sprites.push(sprite); // Добавляем в массив sprites
  }

  createParticle() {
    const particlesConfig = [
      {
        name: "particlesBottom",
        anchor: { x: 0.5, y: 1 },
        yPosition: this.viewport.worldHeight,
      },
      {
        name: "particlesCenter",
        anchor: { x: 0.5, y: 0 },
        yPosition: 0,
      },
    ];

    particlesConfig.forEach((config) => {
      const sprite = Sprite.from(config.name);
      sprite.zIndex = 100;
      sprite.x = this.viewport.worldWidth / 2;
      sprite.anchor.set(config.anchor.x, config.anchor.y);
      sprite.y = config.yPosition;
      this.container.addChild(sprite);
      this.sprites.push(sprite); // Добавляем в массив sprites
    });
  }

  createBoomEffect() {
    const sprite = Sprite.from("boom");
    sprite.anchor.set(0.5);
    sprite.x = this.viewport.worldWidth / 2;
    sprite.y = 310 + 10;
    sprite.alpha = 0.7;
    this.container.addChild(sprite);
    this.sprites.push(sprite); // Добавляем в массив sprites
  }

  removeBanknote() {
    this.sprites.forEach((sprite) => {
      this.container.removeChild(sprite);
    });
    this.sprites = [];
  }

  addToViewport() {
    this.viewport.addChild(this.container);
  }
}

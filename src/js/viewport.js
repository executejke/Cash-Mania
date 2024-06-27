import { Viewport as PixiViewport } from "pixi-viewport";
import { Game } from "./game";
import { Marquee } from "./marquee";
import { createLogoSprite } from "../sprites/logo";
import { Sprite } from "pixi.js";
import { createDivides } from "../sprites/divides";
import { createGradients } from "../sprites/gradients";
import { createRectangleTryNow } from "../sprites/rectangle";

export class CustomViewport {
  constructor(
    app,
    width,
    height,
    worldWidth,
    worldHeight,
    events,
    localization
  ) {
    this.app = app;
    this.width = width;
    this.height = height;
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
    this.localization = localization;
    this.events = events;

    this.initializeViewport();
    this.handleResize();

    window.addEventListener("resize", this.onResize.bind(this));
  }

  initializeViewport() {
    this.viewport = new PixiViewport({
      screenWidth: this.width,
      screenHeight: this.height,
      worldWidth: this.worldWidth,
      worldHeight: this.worldHeight,
      events: this.events,
    });

    this.app.stage.addChild(this.viewport);
    this.viewport.zIndex = 1;

    this.addSpritesToViewport();

    this.background = Sprite.from("bg1");
    this.background.zIndex = 4;
    this.viewport.addChild(this.background);
  }

  addSpritesToViewport() {
    this.viewport.addChild(createLogoSprite(this.viewport.worldWidth));
    this.viewport.addChild(createDivides(this.viewport.worldWidth));
    this.viewport.addChild(createGradients(this.viewport.worldWidth));
    this.viewport.addChild(
      createRectangleTryNow(this.viewport.worldWidth, this.localization)
    );

    this.gameInstance = new Game(this.viewport, this.localization);
    this.marqueeInstance = new Marquee(
      this.viewport,
      this.app,
      this.localization
    );
  }

  handleResize() {
    const scaleX = window.innerWidth / this.background.width;
    const scaleY = window.innerHeight / this.background.height;
    const scale =
      window.innerWidth >= this.background.width ||
      window.innerHeight >= this.background.height
        ? Math.min(scaleX, scaleY)
        : Math.max(scaleX, scaleY);

    this.viewport.setZoom(scale);
    this.viewport.moveCenter(
      this.background.width / 2,
      this.background.height / 2
    );
  }

  onResize() {
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
    this.viewport.resize(
      window.innerWidth,
      window.innerHeight,
      this.viewport.worldWidth,
      this.viewport.worldHeight
    );
    this.handleResize();
  }
}

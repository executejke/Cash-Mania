import { Viewport as vp } from "pixi-viewport";
import { Sprites } from "./sprites";
import { Game } from "./game";
import { Banknote } from "./banknote";

export class Viewport {
  constructor(app, width, height, worldWidth, worldHeight, events) {
    this.app = app;
    this.width = width;
    this.height = height;
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
    this.events = events;
    this.init();
    this.resize();
  }
  init() {
    this.viewport = new vp({
      screenWidth: this.width,
      screenHeight: this.height,
      worldWidth: this.worldWidth,
      worldHeight: this.worldHeight,
      events: this.events,
    });
    this.app.stage.addChild(this.viewport);
    const sprites = new Sprites(
      this.viewport,
      this.app.screen.width,
      this.app.screen.height
    );
    const game = new Game(this.viewport);
  }

  resize() {
    this.viewport.fit();
    const coverScale = this.viewport.findCover(
      this.viewport.worldWidth,
      this.viewport.worldHeight
    );
    this.viewport.moveCenter(
      this.viewport.worldWidth / 2,
      this.viewport.worldHeight / 2
    );
  }
}

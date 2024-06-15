// import * as PIXI from "pixi.js";
import "../style.css";
import { Application, Sprite } from "pixi.js";
import { Viewport } from "./viewport";
import { Preload } from "./preload";

export class Main {
  constructor() {
    this.init();
  }

  async init() {
    this.app = new Application();
    await this.app.init({
      antialias: true,
      width: 400,
      height: 800,
      background: "244799",
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      resizeTo: window,
    });
    document.body.appendChild(this.app.canvas);
    await Preload.load();

    this.viewport = new Viewport(
      this.app,
      window.innerWidth,
      window.innerHeight,
      500,
      1000,
      this.app.renderer.events
    );
  }
}

const main = new Main();

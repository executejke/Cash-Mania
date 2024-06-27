import "../style.css";
import { Application } from "pixi.js";
import { loadLocalizationFile, getLocalizationData } from "./localization";
import { CustomViewport } from "./viewport";
import { Preload } from "./preload";
import cookieManager from "./cookieManager";
export class Main {
  constructor() {
    this.init();
  }

  async init() {
    cookieManager.redirectToIfCookie();
    this.app = new Application();
    await loadLocalizationFile();
    const localizationData = getLocalizationData();
    await this.app.init({
      antialias: true,
      width: window.innerWidth,
      height: window.innerHeight,
      background: "244799",
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });
    globalThis.__PIXI_APP__ = this.app;
    document.body.appendChild(this.app.canvas);
    await Preload.load();

    this.viewport = new CustomViewport(
      this.app,
      window.innerWidth,
      window.innerHeight,
      1024,
      1024,
      this.app.renderer.events,
      localizationData
    );
  }
}

const main = new Main();

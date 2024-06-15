import { createLogoSprite } from "../sprites/logo";
import { createBackgroundSprite } from "../sprites/background";
import { createMarquee } from "../sprites/marquee";
import { createButtonSprite } from "./button";
import { createRectangleTryNow } from "../sprites/rectangle";
import { createCashSprite } from "../sprites/cash";
import { createTexture } from "../sprites/texture";
import { createDivides } from "../sprites/divides";
import { createGradients } from "../sprites/gradients";
import { createElements } from "../sprites/elements";
import { createBanknote } from "./banknote";
import { createBlur } from "../sprites/blur";
export class Sprites {
  constructor(viewport, appWidth, appHeight) {
    this.viewport = viewport;
    this.appWidth = appWidth;
    this.appHeight = appHeight;
    this.viewport.addChild(
      createBackgroundSprite(viewport.worldWidth, viewport.worldHeight)
    );
    this.viewport.addChild(createCashSprite(viewport.worldHeight));
    this.viewport.addChild(createLogoSprite(viewport.worldWidth));
    this.viewport.addChild(
      createMarquee(
        viewport.worldWidth,
        viewport,
        this.appWidth,
        this.appHeight
      )
    );
    this.viewport.addChild(createRectangleTryNow(viewport.worldWidth));
    this.viewport.addChild(createTexture());
    this.viewport.addChild(createDivides(viewport.worldWidth));
    this.viewport.addChild(
      createGradients(viewport.worldWidth, viewport.worldHeight)
    );
    // this.viewport.addChild(
    //   createBanknote(viewport.worldWidth, viewport.worldHeight)
    // );
    // this.viewport.addChild(
    //   createElements(viewport.worldWidth, viewport.worldHeight)
    // );
  }
}

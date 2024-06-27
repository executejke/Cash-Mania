import "../style.css";
import { Assets } from "pixi.js";

import logo from "../assets/img/logo.png";
import rectangle from "../assets/img/rectangle.png";
import rectangleTryNow from "../assets/img/rectangleTryNow.png";
import lightTop from "../assets/img/light 1.png";
import lightBottom from "../assets/img/light 2.png";

import buttonOff from "../assets/img/buttonOff.png";
import button1 from "../assets/img/button1.png";
import lightTryNowTop from "../assets/img/lightTryNowTop.png";
import lightTryNowBottom from "../assets/img/lightTryNowBottom.png";

import divideGPT from "../assets/img/divideGPT.png";
import rectangleBlurTop from "../assets/img/rectangleBlurTop.png";
import rectangleBlurBottom from "../assets/img/rectangleBlurBottom.png";
import elem1 from "../assets/img/elem 1.png";
import elem2 from "../assets/img/elem 2.png";
import elem3 from "../assets/img/elem 3.png";
import elem4 from "../assets/img/elem 4.png";
import elem5 from "../assets/img/elem 5.png";
import elem6 from "../assets/img/elem 6.png";
import elem7 from "../assets/img/elem 7.png";
import elem8 from "../assets/img/elem 8.png";
import elem9 from "../assets/img/elem 9.png";
import elem10 from "../assets/img/elem 10.png";
import elem11 from "../assets/img/elem 11.png";
import elem12 from "../assets/img/elem 12.png";
import elem13 from "../assets/img/elem 13.png";
import elem14 from "../assets/img/elem 14.png";
import elem15 from "../assets/img/elem 15.png";
import elemWin from "../assets/img/elemWin.png";
import elemWin2 from "../assets/img/elemWin2.png";
import banknote from "../assets/img/banknote.png";
import banknoteX from "../assets/img/banknoteX.png";
import character from "../assets/img/character.png";

import particlesBottom from "../assets/img/particlesBottom.png";
import particlesCenter from "../assets/img/particlesCenter.png";
import particles from "../assets/img/particles.png";
import boom from "../assets/img/boom.png";
import blur from "../assets/img/blue.png";
import popupRectangle from "../assets/img/popupRectangle.png";
import popupButton from "../assets/img/popupButton.png";
import popupCTAButton from "../assets/img/popupCTAButton.png";
import popupBoom from "../assets/img/popupBoomUnderButton.png";
import stars from "../assets/img/stars.png";
import bg1 from "../assets/img/bg1.png";
import komika from "../assets/fonts/komika.otf";

export class Preload {
  static async load() {
    const assets = [
      { alias: "logo", src: logo },
      { alias: "rectangle", src: rectangle },
      { alias: "rectangleTryNow", src: rectangleTryNow },
      { alias: "lightTop", src: lightTop },
      { alias: "lightBottom", src: lightBottom },
      { alias: "buttonOff", src: buttonOff },
      { alias: "button1", src: button1 },
      { alias: "lightTryNowTop", src: lightTryNowTop },
      { alias: "lightTryNowBottom", src: lightTryNowBottom },
      { alias: "divideGPT", src: divideGPT },
      { alias: "rectangleBlurTop", src: rectangleBlurTop },
      { alias: "rectangleBlurBottom", src: rectangleBlurBottom },
      { alias: "elem1", src: elem1 },
      { alias: "elem2", src: elem2 },
      { alias: "elem3", src: elem3 },
      { alias: "elem4", src: elem4 },
      { alias: "elem5", src: elem5 },
      { alias: "elem6", src: elem6 },
      { alias: "elem7", src: elem7 },
      { alias: "elem8", src: elem8 },
      { alias: "elem9", src: elem9 },
      { alias: "elem10", src: elem10 },
      { alias: "elem11", src: elem11 },
      { alias: "elem12", src: elem12 },
      { alias: "elem13", src: elem13 },
      { alias: "elem14", src: elem14 },
      { alias: "elem15", src: elem15 },
      { alias: "elemWin", src: elemWin },
      { alias: "elemWin2", src: elemWin2 },
      { alias: "banknote", src: banknote },
      { alias: "particlesBottom", src: particlesBottom },
      { alias: "particlesCenter", src: particlesCenter },
      { alias: "particles", src: particles },
      { alias: "boom", src: boom },
      { alias: "blur", src: blur },
      { alias: "popupRectangle", src: popupRectangle },
      { alias: "popupButton", src: popupButton },
      { alias: "popupCTAButton", src: popupCTAButton },
      { alias: "popupBoom", src: popupBoom },
      { alias: "stars", src: stars },
      { alias: "banknoteX", src: banknoteX },
      { alias: "character", src: character },
      { alias: "bg1", src: bg1 },
      { alias: "komika", src: komika },
    ];

    assets.forEach((asset) => Assets.add(asset));

    const loadedAssets = await Promise.all(
      assets.map((asset) => Assets.load(asset.alias))
    );
  }
}

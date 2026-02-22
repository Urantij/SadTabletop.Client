import type LeGame from "../LeGame";
import type AssetInfo from "../things/AssetInfo";
import AssetVariant from "../things/AssetVariant";
import Animka from "./Animka";
import CardRenderManager from "./CardRenderManager";
import { makeAssetName } from "./MainScene";
import { defaultBackSideKey, defaultFrontSidekey } from "./objects/CardObject";
import { cursorTextureKey } from "./objects/CursorObject";
import { deckSpotKey } from "./objects/DeckObject";
import { defaultDiceTextureKey } from "./objects/DiceObject";

export default class BaseScene extends Phaser.Scene {
  leGame!: LeGame;

  readonly animka: Animka = new Animka(this);

  readonly cardRender: CardRenderManager = new CardRenderManager(this);

  init(game: LeGame) {
    this.leGame = game;
  }

  protected loadDefaultAssets() {

    if (!this.textures.exists(defaultDiceTextureKey)) {
      this.textures.generate(defaultDiceTextureKey, {
        data: ['1'],
        pixelWidth: 1,
        pixelHeight: 1
      });
    }

    this.load.image(defaultBackSideKey, "back.png");
    this.load.image(defaultFrontSidekey, "front.png");
    this.load.image(cursorTextureKey, "cursor.png");

    this.load.image(deckSpotKey, "deckspot.png");
  }

  protected loadAsset(asset: AssetInfo) {

    // TODO вот у меня две сцены грузят одни ассеты, они же не грузят память х2, как думаешь? :)

    if (asset.variant === AssetVariant.Image) {
      this.load.image(asset.name, asset.url);
      // TODO разобраться ок или нет
      this.load.image(makeAssetName(asset.id), asset.url);
    }
    else {
      console.warn(`Неизвестный тип ассета ${asset.variant}`);
    }
  }
}

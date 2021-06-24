import Phaser from "phaser";
import { TILE_SIZE } from "../../shared/constants/Tilemap";
import Heading from "../../shared/enums/Heading";
import StandingFrame from "../enums/StandingFrame";
import ClientFont from "../enums/ClientFont";
import { getStandingFrame, headingToDirection } from "../utils/Mappings";
import CombatText from "./CombatText";

const TAG = "[Character]";

// TODO: caminata, depurar clase
//

const CHAT_TEXT_LIFE = 200;

export default class Character {
  private _scene: Phaser.Scene;
  private _charId: string;
  private _username: string;
  private _position: Phaser.Math.Vector2;
  private _heading: Heading;
  private _bodyId: number;
  private _headId: number;
  private _chatText: string;
  private _chatTextLife: number;

  // GameObjects
  // TODO: init all on constructor
  private _container: Phaser.GameObjects.Container;
  private _debugRect: Phaser.GameObjects.Rectangle;
  private _bodySprite: Phaser.GameObjects.Sprite;
  private _headSprite: Phaser.GameObjects.Sprite;
  private _animSprite: Phaser.GameObjects.Sprite;
  private _usernameBitmapText: Phaser.GameObjects.BitmapText;
  private _chatBitmapText: Phaser.GameObjects.BitmapText;
  private _combatTexts: CombatText[];

  // Getters
  public getCharId(): string {
    return this._charId;
  }

  public getDebugRect(): Phaser.GameObjects.Rectangle {
    return this._debugRect;
  }

  public getBodySprite(): Phaser.GameObjects.Sprite {
    return this._bodySprite;
  }

  public getContainer(): Phaser.GameObjects.Container {
    return this._container;
  }

  public getHeading(): Heading {
    return this._heading;
  }

  public getPosition(): Phaser.Math.Vector2 {
    return this._position;
  }

  // Setters
  public setDefaultCharacter(): void {
    this._scene.cameras.main.startFollow(this._container, true);
    this._scene.cameras.main.setFollowOffset(-TILE_SIZE / 2, -TILE_SIZE / 2);
  }

  // Private methods
  private synchPosition(): void {
    this._container.setPosition(
      this._position.x * TILE_SIZE,
      this._position.y * TILE_SIZE
    );
  }

  private clearAnimation(): void {
    this._animSprite.setAlpha(0);
  }

  constructor(
    scene: Phaser.Scene,
    charId: string,
    username: string,
    x: number,
    y: number,
    heading: Heading,
    bodyId: number,
    headId: number
  ) {
    this._scene = scene;
    this._charId = charId;
    this._username = username;
    this._position = new Phaser.Math.Vector2(x, y);
    this._heading = heading;
    this._bodyId = bodyId;
    this._headId = headId;
    this._chatText = "";
    this._chatTextLife = CHAT_TEXT_LIFE;

    this._combatTexts = [];

    // GameObjects
    this._debugRect = this._scene.add.rectangle(
      0,
      0,
      TILE_SIZE,
      TILE_SIZE,
      0x00ff00,
      0
    );
    this._bodySprite = this._scene.add.sprite(16, 0, "bodies");
    this._headSprite = this._scene.add.sprite(16, -19, "heads");
    this._animSprite = this._scene.add.sprite(16, -24, "spells");

    this._usernameBitmapText = this._scene.add.bitmapText(
      0,
      28,
      ClientFont.CHARACTERS,
      this._username
    );
    this._usernameBitmapText.setPosition(
      16 - this._usernameBitmapText.width / 2,
      28
    );

    this._chatBitmapText = this._scene.add.bitmapText(
      0,
      -44,
      ClientFont.CHARACTERS,
      this._chatText
    );
    this._chatBitmapText.setPosition(16 - this._chatBitmapText.width / 2, -44);

    this._animSprite.setAlpha(0);
    this._animSprite.on("animationcomplete", () => {
      this.clearAnimation();
    });

    this._container = this._scene.add.container(
      this._position.x * TILE_SIZE,
      this._position.y * TILE_SIZE,
      [
        this._debugRect,
        this._bodySprite,
        this._headSprite,
        this._animSprite,
        this._usernameBitmapText,
        this._chatBitmapText,
      ]
    );
  }

  public move(heading: Heading, position: Phaser.Math.Vector2): void {
    this.setHeading(heading);
    this._position = position;
    this.synchPosition();
  }

  public setHeading(heading: Heading): void {
    this._heading = heading;
    const standingFrame = getStandingFrame(this._heading);

    this._bodySprite.setFrame(`body${this._bodyId}_${standingFrame}`);
    this._headSprite.setTexture(
      "heads",
      `head${this._headId}_${this._heading}`
    );
  }

  public startWalkingAnimation(heading: Heading): void {
    this._heading = heading;
    this._bodySprite.anims.play(`anim_body${this._bodyId}_${this._heading}`);
    this._headSprite.setTexture(
      "heads",
      `head${this._headId}_${this._heading}`
    );
  }

  public stopWalkingAnimation(): void {
    const standingFrame = getStandingFrame(this._heading);
    this._bodySprite.anims.stop();
    this._bodySprite.setFrame(`body${this._bodyId}_${standingFrame}`);
  }

  public playAnimation(animationId: number): void {
    this._animSprite.setAlpha(0.7);
    this._animSprite.anims.play(`anim_spell${animationId}`);
  }

  public createCombatText(value: number): void {
    const combatText = new CombatText(
      this._scene,
      this._combatTexts.length,
      this._position,
      value
    );
    this._combatTexts.push(combatText);
  }

  public updateChatText(value: string, color: number): void {
    this._chatBitmapText.setText(value);
    this._chatBitmapText.setPosition(16 - this._chatBitmapText.width / 2, -44);
    this._chatBitmapText.setTint(color);
    this._chatTextLife = CHAT_TEXT_LIFE;
  }

  public update(time: number, delta: number): void {
    if (this._chatTextLife > 0) {
      this._chatTextLife--;
      this._chatBitmapText.setAlpha(this._chatTextLife / CHAT_TEXT_LIFE);
    }

    this._combatTexts.forEach((combatText) => {
      combatText.update();
      if (combatText.getCurrentLife() === 0) {
        combatText.dispose();
        this._combatTexts = this._combatTexts.filter(
          (cT) => cT.getId() !== combatText.getId()
        );
      }
    });
  }

  public dispose(): void {
    this._bodySprite.destroy();
    this._headSprite.destroy();
    this._animSprite.destroy();
    this._usernameBitmapText.destroy();
    this._chatBitmapText.destroy();
    this._combatTexts.forEach((combatText) => {
      combatText.dispose();
    });
    this._combatTexts = [];
    this._container.destroy();
  }
}

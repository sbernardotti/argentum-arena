import Phaser from "phaser";
import { TILE_SIZE } from "../../shared/constants/Tilemap";
import ClientFont from "../enums/ClientFont";

const TAG = "[CombatText]";

const INITIAL_LIFE = 80;

export default class CombatText {
  private _scene: Phaser.Scene;
  private _id: number;
  private _position: Phaser.Math.Vector2;
  private _value: number;
  private _life: number;

  // GameObjects
  private _valueBitmapText: Phaser.GameObjects.BitmapText;

  // Getters
  public getId(): number {
    return this._id;
  }

  public getCurrentLife(): number {
    return this._life;
  }

  constructor(
    scene: Phaser.Scene,
    id: number,
    position: Phaser.Math.Vector2,
    value: number
  ) {
    this._scene = scene;
    this._id = id;
    this._position = position;
    this._value = value;
    this._life = INITIAL_LIFE;

    this._valueBitmapText = this._scene.add.bitmapText(
      this._position.x * TILE_SIZE,
      this._position.y * TILE_SIZE,
      ClientFont.COMBAT_TEXT,
      `${this._value}`
    );
    this._valueBitmapText.setTint(this._value < 0 ? 0xff0000 : 0x00ff00);
  }

  public update(): void {
    this._life--;

    if (this._life > 0) {
      this._valueBitmapText.setPosition(
        this._position.x * TILE_SIZE,
        this._position.y * TILE_SIZE - (INITIAL_LIFE - this._life)
      );
      this._valueBitmapText.setAlpha(this._life / INITIAL_LIFE);
    }
  }

  public dispose(): void {
    this._valueBitmapText.destroy();
  }
}

import Phaser from "phaser";
import ClientFont from "../enums/ClientFont";

const TAG = "[StatusBar]";

const BAR_WIDTH = 224;
const BAR_HEIGHT = 25;

export default class StatusBar {
  private _scene: Phaser.Scene;
  private _position: Phaser.Math.Vector2;
  private _color: number;
  private _minValue: number;
  private _maxValue: number;

  // GameObjects
  private _bar?: Phaser.GameObjects.Graphics;
  private _valueBitmapText?: Phaser.GameObjects.BitmapText;

  constructor(
    scene: Phaser.Scene,
    position: Phaser.Math.Vector2,
    color: number
  ) {
    this._scene = scene;
    this._position = position;
    this._color = color;
    this._maxValue = 100;
    this._minValue = 0;
  }

  public create(): void {
    this._bar = new Phaser.GameObjects.Graphics(this._scene);

    this._bar.fillStyle(0x212121);
    this._bar.fillRect(
      this._position.x,
      this._position.y,
      BAR_WIDTH,
      BAR_HEIGHT
    );

    this._scene.add.existing(this._bar);

    this._valueBitmapText = this._scene.add.bitmapText(
      this._position.x,
      this._position.y,
      ClientFont.UI,
      `${this._minValue} / ${this._maxValue}`
    );
  }

  public update(min: number, max: number): void {
    this._minValue = min;
    this._maxValue = max;

    this._bar?.clear();

    this._bar?.fillStyle(0x212121);
    this._bar?.fillRect(
      this._position.x - BAR_WIDTH / 2,
      this._position.y,
      BAR_WIDTH,
      BAR_HEIGHT
    );

    this._bar?.fillGradientStyle(
      this._color,
      this._color,
      0x000000,
      0x000000,
      1
    );
    this._bar?.fillRect(
      this._position.x - BAR_WIDTH / 2,
      this._position.y,
      (this._minValue * BAR_WIDTH) / this._maxValue,
      BAR_HEIGHT
    );

    this._valueBitmapText?.setText(`${this._minValue} / ${this._maxValue}`);
    this._valueBitmapText?.setPosition(
      this._position.x + -this._valueBitmapText!.width / 2,
      this._position.y + 5
    );
  }
}

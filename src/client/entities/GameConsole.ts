import Phaser from "phaser";
import ClientFont from "../enums/ClientFont";
import ConsoleBuffer from "../types/ConsoleBuffer";

const TAG = "[GameConsole]";

const MAX_HISTORY_SIZE = 300;
const MAX_LINES = 13;

export default class GameConsole {
  private _scene: Phaser.Scene;
  private _buffer: ConsoleBuffer[];
  private _nodes: Phaser.GameObjects.BitmapText[];
  private _offset: number;

  constructor(scene: Phaser.Scene) {
    this._scene = scene;
    this._buffer = [];
    this._nodes = [];
    this._offset = 0;
  }

  public create(): void {
    for (let i = 0; i < MAX_LINES; i++) {
      this._nodes.push(
        this._scene.add.bitmapText(10, 20 + i * 10, ClientFont.CONSOLE, "")
      );
    }
  }

  public update(): void {}

  public addLine(text: string, color: number = 0xffffff) {
    this._buffer.push({ text, color });

    if (this._buffer.length === MAX_LINES) this._buffer.shift();

    for (let i = 0; i < MAX_LINES; i++) {
      if (this._buffer[i]) {
        const line = this._buffer[i];

        this._nodes[i].text = line.text;
        this._nodes[i].tint = line.color;
      }
    }
  }
}

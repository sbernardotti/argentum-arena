import Phaser from "phaser";
import ClientFont from "../enums/ClientFont";
import SpellsScene from "../scenes/SpellsScene";

const TAG = "[SpellSlot]";

export default class SpellSlot {
  private _scene: SpellsScene;
  private _position: Phaser.Math.Vector2;
  private _slotWidth: number;
  private _slotHeight: number;
  private _spellId: number;
  private _description: string;
  private _selected: boolean;

  // GameObjects
  private _descriptionBitmapText?: Phaser.GameObjects.BitmapText;
  private _selectRect?: Phaser.GameObjects.Rectangle;

  // Getters
  public getSpellId(): number {
    return this._spellId;
  }

  public getPosition(): Phaser.Math.Vector2 {
    return this._position;
  }

  constructor(
    scene: SpellsScene,
    position: Phaser.Math.Vector2,
    slotWidth: number,
    slotHeight: number,
    spellId: number,
    description: string
  ) {
    this._scene = scene;
    this._position = position;
    this._slotWidth = slotWidth;
    this._slotHeight = slotHeight;
    this._spellId = spellId;
    this._description = description;
    this._selected = false;

    this._descriptionBitmapText = this._scene.add.bitmapText(
      this._position.x - 100,
      this._position.y - 6,
      ClientFont.SPELLS_LIST,
      this._description
    );

    this._selectRect = this._scene.add
      .rectangle(
        this._position.x,
        this._position.y,
        this._slotWidth,
        this._slotHeight,
        0xffffff
      )
      .setInteractive()
      .on("pointerdown", () => {
        const emitter = this._scene.getEmitter();
        emitter.emit("select-spell", { spellId });
      });

    this.update();
  }

  public select(value: boolean = true): void {
    this._selected = value;
    this.update();
  }

  public move(y: number): void {
    this._position = new Phaser.Math.Vector2(this._position.x, y);
    this.update();
  }

  public update(): void {
    const alpha = this._selected ? 0.3 : 0.1;

    this._descriptionBitmapText?.setPosition(
      this._position.x - 100,
      this._position.y - 6
    );

    this._selectRect?.setAlpha(alpha);
    this._selectRect?.setPosition(this._position.x, this._position.y);
  }
}

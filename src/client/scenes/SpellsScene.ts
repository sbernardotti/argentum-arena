import Phaser from "phaser";
import SelectSpellCommand from "../commands/SelectSpellCommand";
import SpellSlot from "../entities/SpellSlot";
import ClientFont from "../enums/ClientFont";
import SceneData from "../types/SceneData";
import BaseScene from "./BaseScene";

const TAG = "[SpellsScene]";

const SLOT_WIDTH = 224;
const SLOT_HEIGHT = 20;

const POSITION_X = 850;
const POSITION_Y = 210;

const spells = [
  { id: 0, description: "" },
  { id: 8, description: "Resucitar" },
  { id: 7, description: "Fuerza" },
  { id: 6, description: "Celeridad" },
  { id: 5, description: "Tormenta de fuego" },
  { id: 4, description: "Descarga electrica" },
  { id: 3, description: "Apocalipsis" },
  { id: 2, description: "Inmovilizar" },
  { id: 1, description: "Remover paralisis" },
];

export default class SpellsScene extends BaseScene {
  private _spellsEventEmiter?: Phaser.Events.EventEmitter;
  private _slots: SpellSlot[];
  private _selectedSlot?: SpellSlot;

  // GameObjects
  private _castButton?: Phaser.GameObjects.Rectangle;
  private _upButton?: Phaser.GameObjects.Rectangle;
  private _downButton?: Phaser.GameObjects.Rectangle;

  constructor() {
    super("spellsScene");

    this._slots = [];
  }

  public create(data: SceneData): void {
    this._clientService = data.clientService;

    this._spellsEventEmiter = new Phaser.Events.EventEmitter();

    spells.forEach((spell, index) => {
      const position = new Phaser.Math.Vector2(
        POSITION_X,
        POSITION_Y + index * 27
      );
      this._slots.push(
        new SpellSlot(
          this,
          position,
          SLOT_WIDTH,
          SLOT_HEIGHT,
          spell.id,
          spell.description
        )
      );
    });

    // Select spell event
    this._spellsEventEmiter.on("select-spell", (data: { spellId: number }) => {
      const { spellId } = data;
      const slot = this._slots.find((s) => s.getSpellId() === spellId);

      if (this._selectedSlot) {
        this._selectedSlot.select(false);
      }

      slot?.select();
      this._selectedSlot = slot;
    });

    // Cast button
    this._castButton = this.add
      .rectangle(POSITION_X - 20, POSITION_Y + 250, 184, 25, 0xc0c0c0)
      .setInteractive()
      .on("pointerdown", () => {
        if (this._selectedSlot) {
          const spellId = this._selectedSlot.getSpellId();

          this.getDispatcher().dispatch(new SelectSpellCommand(), { spellId });
        }
      });

    // Up & down button
    this._upButton = this.add
      .rectangle(POSITION_X + 82, POSITION_Y + 250, 20, 25, 0xff00ff)
      .setInteractive()
      .on("pointerdown", () => {
        if (this._selectedSlot) {
          const positionY = this._selectedSlot.getPosition().y;
          this._selectedSlot.move(100);
        }
      });

    this._downButton = this.add
      .rectangle(POSITION_X + 102, POSITION_Y + 250, 20, 25, 0x00ff00)
      .setInteractive()
      .on("pointerdown", () => {
        //alert("spell down");
      });

    this.scene.setVisible(false, this);
  }

  public getEmitter(): Phaser.Events.EventEmitter {
    return this._spellsEventEmiter!;
  }

  public update(time: number, delta: number): void {}
}

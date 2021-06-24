import Phaser from "phaser";
import Slot from "../types/Slot";

const TAG = "[Inventory]";

const SLOTS_WIDTH = 5;
const SLOTS_HEIGHT = 5;

const SPACING = 38;

export default class Inventory {
  private _scene: Phaser.Scene;
  private _position: Phaser.Math.Vector2;
  private _slots: Slot[];
  private _sprites?: Phaser.GameObjects.Sprite[];
  private _selectedItem: number;
  private _container?: Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene, position: Phaser.Math.Vector2) {
    this._scene = scene;
    this._position = position;
    this._slots = [
      { item: 1, spriteIndex: 1, description: "Poción roja" },
      { item: 0, spriteIndex: 0, description: "Test 0" },
      { item: 0, spriteIndex: 0, description: "Test 0" },
      { item: 0, spriteIndex: 0, description: "Test 0" },
      { item: 0, spriteIndex: 0, description: "Test 0" },
      { item: 2, spriteIndex: 2, description: "Poción azul" },
      { item: 0, spriteIndex: 0, description: "Test 0" },
      { item: 0, spriteIndex: 0, description: "Test 0" },
      { item: 0, spriteIndex: 0, description: "Test 0" },
      { item: 0, spriteIndex: 0, description: "Test 0" },
      { item: 3, spriteIndex: 3, description: "Poción amarilla" },
      { item: 0, spriteIndex: 0, description: "Test 0" },
      { item: 0, spriteIndex: 0, description: "Test 0" },
      { item: 0, spriteIndex: 0, description: "Test 0" },
      { item: 0, spriteIndex: 0, description: "Test 0" },
      { item: 4, spriteIndex: 4, description: "Poción verde" },
      { item: 0, spriteIndex: 0, description: "Test 0" },
      { item: 0, spriteIndex: 0, description: "Test 0" },
      { item: 0, spriteIndex: 0, description: "Test 0" },
      { item: 6, spriteIndex: 6, description: "Túnica de Druida (E/G)" },
      { item: 8, spriteIndex: 8, description: "Sombrero de hechicero" },
      { item: 0, spriteIndex: 0, description: "Test 0" },
      { item: 0, spriteIndex: 0, description: "Test 0" },
      { item: 0, spriteIndex: 0, description: "Test 0" },
      { item: 7, spriteIndex: 7, description: "Báculo sagrado" },
    ];
    this._selectedItem = 0;
  }

  public create(): void {
    this._container = this._scene.add.container(
      this._position.x,
      this._position.y
    );

    this._sprites = [];

    for (let x = 0; x < SLOTS_HEIGHT; x++) {
      for (let y = 0; y < SLOTS_WIDTH; y++) {
        const slotInfo = this._slots[x * SLOTS_WIDTH + y];
        if (slotInfo && slotInfo.item! > 0) {
          const position = new Phaser.Math.Vector2(
            this._position.x + x * SPACING,
            this._position.y + y * SPACING
          );
          const sprite = this._scene.add
            .sprite(position.x, position.y, "items")
            .setInteractive();

          this._scene.input.setDraggable(sprite);

          this._sprites.push(sprite);

          sprite.setTexture("items", `item${slotInfo.spriteIndex}`);
          this._container.add(sprite);
        }
      }
    }
  }

  public update(): void {
    if (this._selectedItem > 0) {
      const slot = this._slots.findIndex((s) => s.item === this._selectedItem);
      this._sprites![slot].setAlpha(0.3);
    }
  }
}

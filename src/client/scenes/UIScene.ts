import Phaser from "phaser";
import TargetClickCommand from "../commands/TargetClickCommand";
import GameConsole from "../entities/GameConsole";
import StatusBar from "../entities/StatusBar";
import ClientFont from "../enums/ClientFont";
import SceneData from "../types/SceneData";
import BaseScene from "./BaseScene";

const TAG = "[UIScene]";

export default class UIScene extends BaseScene {
  private _gameConsole: GameConsole;

  // GameObjects
  private _targetArea?: Phaser.GameObjects.Rectangle;
  private _usernameBitmapText?: Phaser.GameObjects.BitmapText;
  private _playerPositionBitmapText?: Phaser.GameObjects.BitmapText;
  private _staminaBar: StatusBar;
  private _manaBar: StatusBar;
  private _healthBar: StatusBar;

  // Getters
  public getConsole(): GameConsole {
    return this._gameConsole;
  }

  public getStaminaBar(): StatusBar {
    return this._staminaBar;
  }

  public getManaBar(): StatusBar {
    return this._manaBar;
  }

  public getHealthBar(): StatusBar {
    return this._healthBar;
  }

  public getUsernameText(): Phaser.GameObjects.BitmapText {
    return this._usernameBitmapText!;
  }

  public getPlayerPositionText(): Phaser.GameObjects.BitmapText {
    return this._playerPositionBitmapText!;
  }

  constructor() {
    super("uiScene");

    this._gameConsole = new GameConsole(this); // TODO: pasar position en constructor

    this._staminaBar = new StatusBar(
      this,
      new Phaser.Math.Vector2(850, 515),
      0xffff00
    );

    this._manaBar = new StatusBar(
      this,
      new Phaser.Math.Vector2(850, 565),
      0x00ffcc
    );

    this._healthBar = new StatusBar(
      this,
      new Phaser.Math.Vector2(850, 615),
      0xff0000
    );
  }

  public create(data: SceneData): void {
    this._clientService = data.clientService;

    this._gameConsole.create();

    // Target area
    this._targetArea = this.add
      .rectangle(346, 439, 672, 544, 0x00ff00, 0)
      .setInteractive()
      .on("pointerup", (event: MouseEvent) => {
        const { x, y } = event;
        const payload = {
          x: Math.round(x - 9),
          y: Math.round(y - 164),
        };

        this.getDispatcher().dispatch(new TargetClickCommand(), payload);
      });

    // Status bars
    this._staminaBar.create();
    this._manaBar.create();
    this._healthBar.create();

    // Inventory and spells
    this.scene.launch("inventoryScene", { clientService: this._clientService });
    this.scene.launch("spellsScene", { clientService: this._clientService });

    this.add
      .image(778, 170, "inventory_button")
      .setInteractive()
      .on("pointerup", (event: MouseEvent) => {
        this.scene.setVisible(false, "spellsScene");
        this.scene.setVisible(true, "inventoryScene");
      });

    this.add
      .image(930, 170, "spells_button")
      .setInteractive()
      .on("pointerup", (event: MouseEvent) => {
        this.scene.setVisible(false, "inventoryScene");
        this.scene.setVisible(true, "spellsScene");
      });

    // Username
    this._usernameBitmapText = this.add.bitmapText(730, 50, ClientFont.UI, `-`);

    // Player position
    this._playerPositionBitmapText = this.add.bitmapText(
      730,
      680,
      ClientFont.UI,
      `x: - y: -`
    );
  }

  public update(time: number, delta: number): void {}

  public dispose(): void {
    // TODO: destroy all objects
    //
    this._targetArea?.destroy();
  }
}

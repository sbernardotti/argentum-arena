import Phaser from "phaser";
import SceneData from "../types/SceneData";
import BaseScene from "./BaseScene";

const TAG = "[InventoryScene]";

export default class InventoryScene extends BaseScene {
  constructor() {
    super("inventoryScene");
  }

  public create(data: SceneData): void {
    const { clientService } = data;

    // Services
    this._clientService = clientService;

    this.add.text(780, 200, "Inventario");
  }

  public update(time: number, delta: number): void {}
}

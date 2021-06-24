import Phaser from "phaser";
import ClientService from "../services/ClientService";

const TAG = "[BootScene]";

export default class BootScene extends Phaser.Scene {
  private _clientService?: ClientService;

  constructor() {
    super("BootScene");
  }

  public async preload(): Promise<void> {
    // HTML forms
    this.load.html("loginForm", "html/login.html");

    // TODO: pasar interfaz a atlas
    this.load.image("inventory_button", "png/inventory_button.png");
    this.load.image("spells_button", "png/spells_button.png");

    // Fonts
    this.load.bitmapFont(
      "ArialBlack13",
      "fonts/ArialBlack13.png",
      "fonts/ArialBlack13.xml"
    );
    this.load.bitmapFont(
      "Verdana13",
      "fonts/Verdana13.png",
      "fonts/Verdana13.xml"
    );

    // Maps
    this.load.image("tiles", "png/tileset.png");
    this.load.tilemapTiledJSON("map1", "maps/map1.json");

    // Atlas
    this.load.atlas("heads", "png/heads.png", "atlas/heads.json");
    this.load.atlas("bodies", "png/bodies.png", "atlas/bodies.json");
    this.load.atlas("spells", "png/spells.png", "atlas/spells.json");
    this.load.atlas("items", "png/items.png", "atlas/items.json");

    // Animations
    this.load.animation("bodies", "anims/bodies.json");
    this.load.animation("spells", "anims/spells.json");

    // Events

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    this.load.on("progress", function (value) {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
    });
  }

  public create(): void {
    this._clientService = new ClientService();
    this.scene.launch("loginScene", { clientService: this._clientService });
  }
}

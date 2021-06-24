import Phaser from "phaser";
import InputService from "../services/InputService";
import Heading from "../../shared/enums/Heading";
import SceneData from "../types/SceneData";
import Character from "../entities/Character";
import sortCharacters from "../utils/sortCharacters";
import BaseScene from "./BaseScene";
import RequestWalkCommand from "../commands/RequestWalkCommand";

const TAG = "[MainScene]";

export default class MainScene extends BaseScene {
  [x: string]: any;

  private _inputService?: InputService;
  private _map?: Phaser.Tilemaps.Tilemap;
  private _characters: Character[];

  // Getters
  public getCharacters(): Character[] {
    return this._characters;
  }

  public getCharacter(playerId: string): Character | undefined {
    return this._characters.find((c) => c.getCharId() === playerId);
  }

  constructor() {
    super("mainScene");

    this._characters = [];
  }

  public create(data: SceneData): void {
    const { clientService } = data;

    // Services
    this._clientService = clientService;
    this._inputService = new InputService(clientService, this.input);

    // TODO: pasar todo mapa y gridEngine a clase Tileengine
    //

    // Tilemap
    this._map = this.make.tilemap({ key: "map1" });
    this._map.addTilesetImage("tileset", "tiles");
    for (let i = 0; i < this._map.layers.length; i++) {
      const layer = this._map.createLayer(i, "tileset", 0, 0);
      if (i === 3) layer.alpha = 0;
    }

    // Camera
    this.cameras.main.x = 10;
    this.cameras.main.y = 167;
    this.cameras.resize(672, 544);
  }

  /**
   * Create character.
   */
  public createCharacter(
    playerId: string,
    username: string,
    x: number,
    y: number,
    heading: Heading,
    bodyId: number,
    headId: number
  ): void {
    const newChar = new Character(
      this,
      playerId,
      username,
      x,
      y,
      heading,
      bodyId,
      headId
    );

    this._characters.push(newChar);
  }

  /**
   * Remove character.
   */
  public removeCharacter(playerId: String): void {
    const characterIndex = this._characters.findIndex(
      (c) => c.getCharId() === playerId
    );
    const character = this._characters[characterIndex];

    character?.dispose();
    this._characters.slice(characterIndex, 1);
  }

  public update(time: number, delta: number): void {
    const cursors = this.input.keyboard.createCursorKeys();
    const dispatcher = this.getDispatcher();

    if (cursors.left.isDown) {
      const heading = Heading.LEFT;
      dispatcher.dispatch(new RequestWalkCommand(), { heading });
    } else if (cursors.right.isDown) {
      const heading = Heading.RIGHT;
      dispatcher.dispatch(new RequestWalkCommand(), { heading });
    } else if (cursors.up.isDown) {
      const heading = Heading.UP;
      dispatcher.dispatch(new RequestWalkCommand(), { heading });
    } else if (cursors.down.isDown) {
      const heading = Heading.DOWN;
      dispatcher.dispatch(new RequestWalkCommand(), { heading });
    }

    sortCharacters(this._characters);
    this._characters.forEach((c) => c.update(time, delta));
  }
}

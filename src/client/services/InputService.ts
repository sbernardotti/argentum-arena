import Phaser from "phaser";
import ClientService from "./ClientService";
import Heading from "../../shared/enums/Heading";
import ClientEvent from "../enums/ClientEvent";

const TAG = "[InputService]";

// TODO: pasar todo esto a una escene
//

export default class InputService {
  private _clientService: ClientService;
  private _input: Phaser.Input.InputPlugin;

  constructor(clientService: ClientService, input: Phaser.Input.InputPlugin) {
    this._clientService = clientService;
    this._input = input;

    this.init();
  }

  private init(): void {
    this._input.keyboard.on("keydown", (event: KeyboardEvent) =>
      this.keyDownListener(event)
    );
  }

  private keyDownListener(event: KeyboardEvent): void {
    //event.preventDefault();
    /*switch (event.key) {
      case "ArrowDown":
        this._clientService.requestWalkHandler(Heading.DOWN);
        break;
      case "ArrowUp":
        this._clientService.requestWalkHandler(Heading.UP);
        break;
      case "ArrowLeft":
        this._clientService.requestWalkHandler(Heading.LEFT);
        break;
      case "ArrowRight":
        this._clientService.requestWalkHandler(Heading.RIGHT);
        break;
      case "F11":
        // TODO: toggle fullscreen
        break;
    }*/
  }
}

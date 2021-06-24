import Phaser from "phaser";
import Dispatcher from "../commands/base/Dispatcher";
import IClientService from "../interfaces/IClientService";

export default class BaseScene extends Phaser.Scene {
  protected _clientService?: IClientService;
  private _dispatcher: Dispatcher;

  // Getters
  public getClientService(): IClientService | undefined {
    return this._clientService;
  }

  public getDispatcher(): Dispatcher {
    return this._dispatcher;
  }

  constructor(sceneKey: string) {
    super(sceneKey);

    this._dispatcher = new Dispatcher(this);
  }
}

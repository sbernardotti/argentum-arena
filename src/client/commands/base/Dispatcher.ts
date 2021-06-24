import { Scene } from "phaser";
import Command from "./Command";

const TAG = "[Dispatcher]";

export default class Dispatcher {
  private _scene: Scene;

  constructor(scene: Scene) {
    this._scene = scene;
  }

  public dispatch(command: Command, payload?: unknown): void {
    if (payload) {
      command.setPayload(payload);
    }

    command.execute(this._scene, payload);
  }
}

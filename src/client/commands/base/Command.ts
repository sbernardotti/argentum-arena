import Phaser from "phaser";

const TAG = "[Command]";

export default abstract class Command<Scene = Phaser.Scene, Payload = unknown> {
  _payload?: Payload;

  setPayload(payload: this["_payload"]) {
    this._payload = payload;
  }

  abstract execute(
    scene: Scene,
    payload: this["_payload"]
  ): Array<Command> | void;
}

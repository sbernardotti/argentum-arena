import Command from "./base/Command";
import MainScene from "../scenes/MainScene";

const TAG = "[OnDisconnectCommand]";

type OnDisconnectPayload = {
  error: number;
};

export default class OnDisconnectCommand extends Command<
  MainScene,
  OnDisconnectPayload
> {
  public execute(scene: MainScene, payload: OnDisconnectPayload): void {
    const { error } = payload;

    alert("Disconnected. Error " + error);
    window.location.reload();
  }
}

import Command from "./base/Command";
import Messages from "../../shared/enums/Messages";
import UIScene from "../scenes/UIScene";

const TAG = "[TargetClickCommand]";

type TargetClickPayload = {
  x: number;
  y: number;
};

export default class TargetClickCommand extends Command<
  UIScene,
  TargetClickPayload
> {
  public execute(scene: UIScene, payload: TargetClickPayload): void {
    const { x, y } = payload;
    const clientService = scene.getClientService();

    clientService?.send(Messages.TargetClick, { x, y });
  }
}

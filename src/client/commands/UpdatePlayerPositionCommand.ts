import Command from "./base/Command";
import UIScene from "../scenes/UIScene";

const TAG = "[UpdatePlayerPositionCommand]";

type UpdatePlayerPositionPayload = {
  x: number;
  y: number;
};

export default class UpdatePlayerPositionCommand extends Command<
  UIScene,
  UpdatePlayerPositionPayload
> {
  public execute(scene: UIScene, payload: UpdatePlayerPositionPayload): void {
    const { x, y } = payload;

    scene.getPlayerPositionText().setText(`x: ${x} y: ${y}`);
  }
}

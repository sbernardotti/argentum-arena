import Command from "./base/Command";
import UIScene from "../scenes/UIScene";

const TAG = "[WriteConsoleCommand]";

type WriteConsolePayload = {
  message: string;
  color: number;
};

export default class WriteConsoleCommand extends Command<
  UIScene,
  WriteConsolePayload
> {
  public execute(scene: UIScene, payload: WriteConsolePayload): void {
    const { message, color } = payload;

    scene.getConsole().addLine(message, color);
  }
}

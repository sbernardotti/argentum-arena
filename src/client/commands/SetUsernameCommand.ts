import Command from "./base/Command";
import UIScene from "../scenes/UIScene";

const TAG = "[SetUsernameCommand]";

type SetUsernamePayload = {
  username: string;
};

export default class SetUsernameCommand extends Command<
  UIScene,
  SetUsernamePayload
> {
  public execute(scene: UIScene, payload: SetUsernamePayload): void {
    const { username } = payload;

    scene.getUsernameText().setText(username);
  }
}

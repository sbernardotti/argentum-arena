import Command from "./base/Command";
import MainScene from "../scenes/MainScene";

const TAG = "[UpdateChatTextCommand]";

type UpdateChatTextPayload = {
  playerId: string;
  message: string;
  color: number;
};

export default class UpdateChatTextCommand extends Command<
  MainScene,
  UpdateChatTextPayload
> {
  public execute(scene: MainScene, payload: UpdateChatTextPayload): void {
    const { playerId, message, color } = payload;
    const character = scene.getCharacter(playerId);

    character?.updateChatText(message, color);
  }
}

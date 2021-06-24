import Command from "./base/Command";
import MainScene from "../scenes/MainScene";

const TAG = "[RemoveCharacterCommand]";

type RemoveCharacterPayload = {
  playerId: string;
};

export default class RemoveCharacterCommand extends Command<
  MainScene,
  RemoveCharacterPayload
> {
  public execute(scene: MainScene, payload: RemoveCharacterPayload): void {
    const { playerId } = payload;

    scene.removeCharacter(playerId);
  }
}

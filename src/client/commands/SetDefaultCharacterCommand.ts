import Command from "./base/Command";
import MainScene from "../scenes/MainScene";

const TAG = "[SetDefaultCharacterCommand]";

type SetDefaultCharacterPayload = {
  playerId: string;
};

export default class SetDefaultCharacterCommand extends Command<
  MainScene,
  SetDefaultCharacterPayload
> {
  public execute(scene: MainScene, payload: SetDefaultCharacterPayload): void {
    const { playerId } = payload;
    const character = scene.getCharacter(playerId);

    character?.setDefaultCharacter();
  }
}

import Command from "./base/Command";
import MainScene from "../scenes/MainScene";

const TAG = "[CreateCombatTextCommand]";

type CreateCombatTextPayload = {
  playerId: string;
  value: number;
};

export default class CreateCombatTextCommand extends Command<
  MainScene,
  CreateCombatTextPayload
> {
  public execute(scene: MainScene, payload: CreateCombatTextPayload): void {
    const { playerId, value } = payload;
    const character = scene.getCharacter(playerId);

    character?.createCombatText(value);
  }
}

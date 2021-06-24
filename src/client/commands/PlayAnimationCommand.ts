import Command from "./base/Command";
import MainScene from "../scenes/MainScene";

const TAG = "[PlayAnimationCommand]";

type PlayAnimationPayload = {
  playerId: string;
  animationId: number;
};

export default class PlayAnimationCommand extends Command<
  MainScene,
  PlayAnimationPayload
> {
  public execute(scene: MainScene, payload: PlayAnimationPayload): void {
    const { playerId, animationId } = payload;
    const character = scene.getCharacter(playerId);

    character?.playAnimation(animationId);
  }
}

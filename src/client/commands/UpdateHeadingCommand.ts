import Command from "./base/Command";
import MainScene from "../scenes/MainScene";
import Heading from "../../shared/enums/Heading";

const TAG = "[UpdateHeadingCommand]";

type UpdateHeadingPayload = {
  playerId: string;
  heading: Heading;
};

export default class UpdateHeadingCommand extends Command<
  MainScene,
  UpdateHeadingPayload
> {
  public execute(scene: MainScene, payload: UpdateHeadingPayload): void {
    const { playerId, heading } = payload;
    const character = scene.getCharacter(playerId);

    character?.setHeading(heading);
  }
}

import Command from "./base/Command";
import Heading from "../../shared/enums/Heading";
import MainScene from "../scenes/MainScene";
import Character from "../entities/Character";

const TAG = "[CreateCharacterCommand]";

type CreateCharacterPayload = {
  playerId: string;
  username: string;
  x: number;
  y: number;
  heading: Heading;
  bodyId: number;
  headId: number;
};

export default class CreateCharacterCommand extends Command<
  MainScene,
  CreateCharacterPayload
> {
  public execute(scene: MainScene, payload: CreateCharacterPayload): void {
    const { playerId, username, x, y, heading, bodyId, headId } = payload;

    scene.createCharacter(playerId, username, x, y, heading, bodyId, headId);
  }
}

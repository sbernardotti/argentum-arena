import Phaser from "phaser";
import Command from "./base/Command";
import MainScene from "../scenes/MainScene";
import Heading from "../../shared/enums/Heading";

const TAG = "[MoveCharacterCommand]";

type MoveCharacterPayload = {
  playerId: string;
  heading: Heading;
  x: number;
  y: number;
};

export default class MoveCharacterCommand extends Command<
  MainScene,
  MoveCharacterPayload
> {
  public execute(scene: MainScene, payload: MoveCharacterPayload): void {
    const { playerId, heading, x, y } = payload;
    const character = scene.getCharacter(playerId);

    character?.move(heading, new Phaser.Math.Vector2(x, y));
  }
}

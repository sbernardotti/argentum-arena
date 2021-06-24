import Command from "./base/Command";
import Heading from "../../shared/enums/Heading";
import MainScene from "../scenes/MainScene";
import Messages from "../../shared/enums/Messages";
import { CLIENT_WALK_INTERVAL } from "../../shared/constants/Intervals";

const TAG = "[RequestWalkCommand]";

type RequestWalkPayload = {
  heading: Heading;
};

export default class RequestWalkCommand extends Command<
  MainScene,
  RequestWalkPayload
> {
  public execute(scene: MainScene, payload: RequestWalkPayload): void {
    const { heading } = payload;
    const clientService = scene.getClientService();
    const lastWalkTime = clientService?.getLastWalkTime()!;

    if (Date.now() - lastWalkTime > CLIENT_WALK_INTERVAL) {
      clientService?.send(Messages.RequestWalk, { heading });
      clientService?.updateLastWalkTime();
    }
  }
}

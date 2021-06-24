import { Command } from "@colyseus/command";
import { Client } from "colyseus";
import Messages from "../../shared/enums/Messages";
import Heading from "../../shared/enums/Heading";
import IArgentumArenaState from "../../shared/schemas/IArgentumArenaState";
import TileGrid from "../entities/TileGrid";
import { SERVER_WALK_INTERVAL } from "../../shared/constants/Intervals";

const TAG = "[RequestWalkCommand]";

type RequestWalkPayload = {
  heading: Heading;
  client: Client;
  tileGrid: TileGrid;
};

export default class RequestWalkCommand extends Command<
  IArgentumArenaState,
  RequestWalkPayload
> {
  public async execute(payload: RequestWalkPayload): Promise<void> {
    const { heading, client, tileGrid } = payload;
    const player = this.state.players.get(client.sessionId);

    if (player) {
      if (
        Date.now() - player.state.getLastWalkingTime() >
        SERVER_WALK_INTERVAL
      ) {
        player.heading = heading;
        if (tileGrid.movePlayer(player, heading)) {
          player.state.setLastWalkingtime(Date.now());
          this.room.broadcast(Messages.MoveCharacter, {
            playerId: player.playerId,
            heading: player.heading,
            x: player.x,
            y: player.y,
          });
          player.send(Messages.PlayerPosition, { x: player.x, y: player.y });
        } else {
          // Update heading only
          this.room.broadcast(Messages.UpdateHeading, {
            playerId: player.playerId,
            heading: player.heading,
          });
        }
      }
    }
  }
}

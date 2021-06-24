import { Command, Dispatcher } from "@colyseus/command";
import { Client } from "colyseus";
import IArgentumArenaState from "../../shared/schemas/IArgentumArenaState";
import TileGrid from "../entities/TileGrid";
import { TILE_SIZE } from "../../shared/constants/Tilemap";
import TargetActionType from "../enums/TargetActionType";
import Color from "../../shared/enums/Color";
import {
  CLICK_PLAYER_STRING,
  INVALID_TARGET_STRING,
} from "../../shared/i18n/Strings";
import CastSpellCommand from "./CastSpellCommand";

const TAG = "[TargetClickCommand]";

type TargetClickPayload = {
  x: number;
  y: number;
  client: Client;
  tileGrid: TileGrid;
  dispatcher: Dispatcher;
};

export default class TargetClickCommand extends Command<
  IArgentumArenaState,
  TargetClickPayload
> {
  public execute(payload: TargetClickPayload): any {
    const { x, y, client, tileGrid, dispatcher } = payload;
    const player = this.state.players.get(client.sessionId)!;

    const gridX = Math.ceil(x / TILE_SIZE) + player.x - 11;
    const gridY = Math.ceil(y / TILE_SIZE) + player.y - 9;

    const targetPlayer = tileGrid.getPlayer(gridX, gridY);

    switch (player.state.getTargetActionType()) {
      case TargetActionType.NOTHING:
        if (targetPlayer) {
          player.sendi18n(
            CLICK_PLAYER_STRING,
            Color.GREY,
            targetPlayer.username,
            "Neutral"
          );
        }
        break;

      case TargetActionType.CAST_SPELL:
        if (targetPlayer) {
          dispatcher.dispatch(new CastSpellCommand(), {
            caster: player,
            target: targetPlayer,
          });
        } else {
          player.sendi18n(INVALID_TARGET_STRING, Color.DARK);
        }
        break;

      case TargetActionType.SHOOT_ARROW:
        // TODO
        break;
    }

    player.state.setTargetActionType(TargetActionType.NOTHING);
  }
}

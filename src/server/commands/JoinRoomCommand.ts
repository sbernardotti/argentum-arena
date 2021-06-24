import { Command } from "@colyseus/command";
import { Client } from "colyseus";
import Player from "../../shared/schemas/Player";
import IArgentumArenaState from "../../shared/schemas/IArgentumArenaState";
import Messages from "../../shared/enums/Messages";
import Heading from "../../shared/enums/Heading";
import TileGrid from "../entities/TileGrid";
import validateUsername from "../utils/validateUsername";
import Color from "../../shared/enums/Color";
import {
  BROADCAST_JOIN_PLAYER_STRING,
  WELCOME_MESSAGE_STRING,
} from "../../shared/i18n/Strings";
import ArgentumArenaRoom from "../rooms/ArgentumArenaRoom";
import CharacterClass from "../../shared/enums/CharacterClass";
import CharacterRace from "../../shared/enums/CharacterRace";

const TAG = "[JoinRoomCommand]";

type JoinRoomPayload = {
  username: string;
  client: Client;
  tileGrid: TileGrid;
};

export default class JoinRoomCommand extends Command<
  IArgentumArenaState,
  JoinRoomPayload
> {
  public execute(payload: JoinRoomPayload): void {
    const { username, client, tileGrid } = payload;

    if (!validateUsername(username)) {
      client.error(400, "Nick invalido");
      return;
    }

    // TODO: obtener posiciones de respawn del mapa
    const x = 40 + Math.floor(Math.random() * 10);
    const y = 40 + Math.floor(Math.random() * 10);

    // TODO: obtener dependiendo clase, raza y genero
    const headId = 1;
    const bodyId = 1;

    const player = new Player(
      client,
      client.sessionId,
      username,
      x,
      y,
      Heading.DOWN,
      headId,
      bodyId
    );

    player.lang = this.state.players.size % 2 ? "es" : "en";

    player.state.init(CharacterClass.Archer, CharacterRace.Human);
    player.sendUpdatedState();

    this.state.players.set(client.sessionId, player);

    tileGrid.setBlock(player.x, player.y, player.playerId);

    player.send(Messages.PlayerKey, {
      playerId: player.playerId,
      username: player.username,
    });
    player.send(Messages.PlayerPosition, { x: player.x, y: player.y });

    player.sendi18n(WELCOME_MESSAGE_STRING, Color.GREEN, this.room.roomName);

    const room = this.room as ArgentumArenaRoom;

    room.broadcasti18n(
      BROADCAST_JOIN_PLAYER_STRING,
      Color.GREEN,
      player.username
    );

    console.info(
      TAG,
      `Player "${player.username}" [${player.playerId}] has joined room ${this.room.roomId}`
    );
  }
}

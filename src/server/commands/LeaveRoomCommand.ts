import { Command } from "@colyseus/command";
import { Client } from "colyseus";
import Messages from "../../shared/enums/Messages";
import IArgentumArenaState from "../../shared/schemas/IArgentumArenaState";
import TileGrid from "../entities/TileGrid";
import Color from "../../shared/enums/Color";

const TAG = "[LeaveRoomCommand]";

type LeaveRoomPayload = {
  client: Client;
  tileGrid: TileGrid;
};

export default class LeaveRoomCommand extends Command<
  IArgentumArenaState,
  LeaveRoomPayload
> {
  public async execute(payload: LeaveRoomPayload): Promise<void> {
    const { client, tileGrid } = payload;
    let username = "";

    if (this.state.players.has(client.sessionId)) {
      const player = this.state.players.get(client.sessionId)!;
      username = player.username;
      tileGrid.removeBlock(player.x, player.y);
      this.state.players.delete(client.sessionId);
    }

    this.room.broadcast(Messages.WriteConsole, {
      message: `El usuario ${username} ha abandonado la sala.`,
      color: Color.RED,
    });

    console.info(TAG, `Player "${username}" has left room ${this.room.roomId}`);
  }
}

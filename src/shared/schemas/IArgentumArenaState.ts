import { MapSchema, Schema } from "@colyseus/schema";
import Player from "./Player";

export default interface IArgentumArenaState extends Schema {
  players: MapSchema<Player>;
}

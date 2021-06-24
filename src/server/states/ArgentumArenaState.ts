import { MapSchema, Schema, type } from "@colyseus/schema";
import IArgentumArenaState from "../../shared/schemas/IArgentumArenaState";
import Player from "../../shared/schemas/Player";

export default class ArgentumArenaState
  extends Schema
  implements IArgentumArenaState
{
  @type({ map: Player })
  public players = new MapSchema<Player>();

  // TODO: spells, balance, maps, etc

  constructor() {
    super();
  }
}

import { Schema, type } from "@colyseus/schema";
import { Client } from "colyseus";
import { ISendOptions } from "colyseus/lib/transport/Transport";
import PlayerState from "../../server/states/PlayerState";
import Heading from "../enums/Heading";
import Ii18nString from "../i18n/Ii18nString";
import processi18nString from "../i18n/processi18nString";
import Messages from "../enums/Messages";

const TAG = "[Player]";

export default class Player extends Schema {
  @type("string")
  public playerId: string;

  @type("string")
  public username: string;

  @type("number")
  public x: number;

  @type("number")
  public y: number;

  @type("number")
  public heading: Heading;

  @type("number")
  public bodyId: number;

  @type("number")
  public headId: number;

  // Language
  public lang: string;

  // Player state
  public state: PlayerState;

  // Client
  private client: Client;

  /**
   * Send data.
   */
  public send(
    type: string | number,
    message?: any,
    options?: ISendOptions
  ): void {
    this.client.send(type, message, options);
  }

  /**
   * Send translated message.
   */
  public sendi18n(string: Ii18nString, color: number, ...args: string[]): void {
    const message = processi18nString(this.lang, string, ...args);
    this.client.send(Messages.WriteConsole, {
      message,
      color,
    });
  }

  /**
   * Send updated state to refresh player UI.
   */
  public sendUpdatedState(): void {
    this.client.send(Messages.PlayerState, {
      health: this.state.getHealth(),
      currentHealth: this.state.getCurrentHealth(),
      mana: this.state.getMana(),
      currentMana: this.state.getCurrentMana(),
      stamina: this.state.getStamina(),
      currentStamina: this.state.getCurrentStamina(),
    });
  }

  constructor(
    client: Client,
    playerId: string,
    username: string,
    x: number,
    y: number,
    heading: number,
    bodyId: number,
    headId: number
  ) {
    super();

    this.client = client;
    this.playerId = playerId;
    this.username = username;
    this.x = x;
    this.y = y;
    this.heading = heading;
    this.bodyId = bodyId;
    this.headId = headId;

    this.lang = "es";

    this.state = new PlayerState();
  }
}

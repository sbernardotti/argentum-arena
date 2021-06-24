import { Client, Room } from "colyseus.js";
import IArgentumArenaState from "../../shared/schemas/IArgentumArenaState";
import Heading from "../../shared/enums/Heading";
import Messages from "../../shared/enums/Messages";
import Player from "../../shared/schemas/Player";
import { game } from "../main";
import WriteConsoleCommand from "../commands/WriteConsoleCommand";
import Dispatcher from "../commands/base/Dispatcher";
import UpdateStatusBarsCommand from "../commands/UpdateStatusBarsCommand";
import UpdatePlayerPositionCommand from "../commands/UpdatePlayerPositionCommand";
import CreateCharacterCommand from "../commands/CreateCharacterCommand";
import SetDefaultCharacterCommand from "../commands/SetDefaultCharacterCommand";
import BaseScene from "../scenes/BaseScene";
import IClientService from "../interfaces/IClientService";
import MoveCharacterCommand from "../commands/MoveCharacterCommand";
import RemoveCharacterCommand from "../commands/RemoveCharacterCommand";
import PlayAnimationCommand from "../commands/PlayAnimationCommand";
import UpdateHeadingCommand from "../commands/UpdateHeadingCommand";
import CreateCombatTextCommand from "../commands/CreateCombatTextCommand";
import UpdateChatTextCommand from "../commands/UpdateChatTextCommand";
import OnDisconnectCommand from "../commands/OnDisconnectCommand";
import SetUsernameCommand from "../commands/SetUsernameCommand";

const TAG = "[ClientService]";

export default class ClientService implements IClientService {
  private _client: Client;
  private _room?: Room<IArgentumArenaState>;
  private _playerKey?: string;
  private _lang: string;
  private _lastWalkTime = 0;

  // Dispatchers
  private _mainSceneDispatcher: Dispatcher;
  private _uiSceneDispatcher: Dispatcher;

  // Getters
  public getLanguage(): string {
    return this._lang;
  }

  public getLastWalkTime(): number {
    return this._lastWalkTime;
  }

  constructor() {
    // TODO: setear url y lenguaje desde variable
    //
    this._client = new Client("ws://192.168.100.19:7666");
    this._lang = "en";

    const mainScene = game.scene.getScene("mainScene") as BaseScene;
    this._mainSceneDispatcher = mainScene.getDispatcher();

    const uiScene = game.scene.getScene("uiScene") as BaseScene;
    this._uiSceneDispatcher = uiScene.getDispatcher();
  }

  /**
   * Join room.
   */
  public async join(username: string): Promise<void> {
    // TODO: obtener roomId del query string
    //
    this._room = await this._client.joinOrCreate<IArgentumArenaState>(
      "argentum-arena",
      {
        username,
      }
    );

    // Disconnect
    this._room.onLeave((code: number) => {
      this._mainSceneDispatcher.dispatch(new OnDisconnectCommand(), { code });
    });

    // Player key
    this._room.onMessage(
      Messages.PlayerKey,
      (payload: { playerId: string; username: string }) => {
        this._mainSceneDispatcher.dispatch(
          new SetDefaultCharacterCommand(),
          payload
        );
        this._uiSceneDispatcher.dispatch(new SetUsernameCommand(), payload);
        this._playerKey = payload.playerId;
      }
    );

    // Player position
    this._room.onMessage(
      Messages.PlayerPosition,
      (payload: { x: number; y: number }) => {
        this._uiSceneDispatcher.dispatch(
          new UpdatePlayerPositionCommand(),
          payload
        );
      }
    );

    // Player state
    this._room.onMessage(
      Messages.PlayerState,
      (payload: {
        health: number;
        currentHealth: number;
        mana: number;
        currentMana: number;
        stamina: number;
        currentStamina: number;
      }) => {
        this._uiSceneDispatcher.dispatch(
          new UpdateStatusBarsCommand(),
          payload
        );
      }
    );

    // Create character
    this._room.state.players.onAdd = (player: Player, key: string) => {
      const payload = player.toJSON();

      this._mainSceneDispatcher.dispatch(new CreateCharacterCommand(), payload);
    };

    // Remove character
    this._room.state.players.onRemove = (player: Player, key: string) => {
      const payload = { playerId: key };

      this._mainSceneDispatcher.dispatch(new RemoveCharacterCommand(), payload);
    };

    // Move character
    this._room.onMessage(
      Messages.MoveCharacter,
      (payload: {
        playerId: string;
        heading: Heading;
        x: number;
        y: number;
      }) => {
        this._mainSceneDispatcher.dispatch(new MoveCharacterCommand(), payload);
      }
    );

    // Update character heading
    this._room.onMessage(
      Messages.UpdateHeading,
      (payload: { playerId: string; heading: Heading }) => {
        this._mainSceneDispatcher.dispatch(new UpdateHeadingCommand(), payload);
      }
    );

    // Play animation
    this._room.onMessage(
      Messages.PlayAnimation,
      (payload: { playerId: string; animationId: number }) => {
        this._mainSceneDispatcher.dispatch(new PlayAnimationCommand(), payload);
      }
    );

    // Chat text
    this._room.onMessage(
      Messages.SetChatText,
      (payload: { playerId: string; message: string; color: number }) => {
        this._mainSceneDispatcher.dispatch(
          new UpdateChatTextCommand(),
          payload
        );
      }
    );

    // Combat text
    this._room.onMessage(
      Messages.SetCombatText,
      (payload: { playerId: string; value: number }) => {
        this._mainSceneDispatcher.dispatch(
          new CreateCombatTextCommand(),
          payload
        );
      }
    );

    // Write console
    this._room.onMessage(
      Messages.WriteConsole,
      (data: { message: string; color: number }) => {
        const { message, color } = data;
        this._uiSceneDispatcher.dispatch(new WriteConsoleCommand(), {
          message,
          color,
        });
      }
    );
  }

  /**
   * Send message to server.
   */
  public send(type: number | string, message?: any): void {
    this._room?.send(type, message);
  }

  public updateLastWalkTime(): void {
    this._lastWalkTime = Date.now();
  }
}

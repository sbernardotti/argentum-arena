import { Dispatcher } from "@colyseus/command";
import { Client, Room } from "colyseus";
import Messages from "../../shared/enums/Messages";
import ArgentumArenaState from "../states/ArgentumArenaState";
import RequestWalkCommand from "../commands/RequestWalkCommand";
import TileGrid from "../entities/TileGrid";
import { MAP_HEIGHT, MAP_WIDTH } from "../../shared/constants/Tilemap";
import JoinRoomCommand from "../commands/JoinRoomCommand";
import LeaveRoomCommand from "../commands/LeaveRoomCommand";
import TargetClickCommand from "../commands/TargetClickCommand";
import loadMapInfo from "../utils/loadMapInfo";
import SelectSpellCommand from "../commands/SelectSpellCommand";
import Ii18nString from "../../shared/i18n/Ii18nString";

const TAG = "[ArgentumArenaRoom]";

export default class ArgentumArenaRoom extends Room<ArgentumArenaState> {
  private _dispatcher = new Dispatcher(this);
  private _tileGrid?: TileGrid;

  /**
   * Broadcast translated message.
   */
  public broadcasti18n(
    string: Ii18nString,
    color: number,
    ...args: string[]
  ): void {
    // TODO: except
    this.state.players.forEach((player) =>
      player.sendi18n(string, color, ...args)
    );
  }

  public async onCreate(): Promise<void> {
    this.setState(new ArgentumArenaState());

    this._tileGrid = new TileGrid(this.state, MAP_WIDTH, MAP_HEIGHT);

    const tileGrid = this._tileGrid;
    const mapInfo = loadMapInfo(1);

    tileGrid.loadMapBlockings(mapInfo);

    // Messages

    // RequestWalk
    this.onMessage(
      Messages.RequestWalk,
      (client, message: { heading: number }) => {
        const { heading } = message;
        this._dispatcher.dispatch(new RequestWalkCommand(), {
          heading,
          client,
          tileGrid,
        });
      }
    );

    // SelectSpell
    this.onMessage(
      Messages.SelectSpell,
      (client, message: { spellId: number }) => {
        const { spellId } = message;
        this._dispatcher.dispatch(new SelectSpellCommand(), {
          spellId,
          client,
        });
      }
    );

    // TargetClick
    this.onMessage(
      Messages.TargetClick,
      (client, message: { x: number; y: number }) => {
        const { x, y } = message;
        const dispatcher = this._dispatcher;
        this._dispatcher.dispatch(new TargetClickCommand(), {
          x,
          y,
          client,
          tileGrid,
          dispatcher,
        });
      }
    );
  }

  public async onJoin(
    client: Client,
    options: { username: string }
  ): Promise<void> {
    const tileGrid = this._tileGrid!;
    const { username } = options;
    this._dispatcher.dispatch(new JoinRoomCommand(), {
      username,
      client,
      tileGrid,
    });
  }

  public async onLeave(client: Client): Promise<void> {
    const tileGrid = this._tileGrid!;
    this._dispatcher.dispatch(new LeaveRoomCommand(), {
      client,
      tileGrid,
    });
  }
}

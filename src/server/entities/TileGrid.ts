import IArgentumArenaState from "../../shared/schemas/IArgentumArenaState";
import Heading from "../../shared/enums/Heading";
import Player from "../../shared/schemas/Player";

const TAG = "[TileGrid]";

export default class TileGrid {
  private _state: IArgentumArenaState;
  private _tilesWidth: number;
  private _tilesHeight: number;
  private _tiles: any[][];

  /**
   * Creates a TileGrid.
   * @param tilesWidth Width in tiles.
   * @param tilesHeight Height in tiles.
   */
  constructor(
    state: IArgentumArenaState,
    tilesWidth: number,
    tilesHeight: number
  ) {
    this._state = state;
    this._tilesWidth = tilesWidth;
    this._tilesHeight = tilesHeight;
    this._tiles = [];

    for (let y: number = 0; y < this._tilesHeight; y++) {
      this._tiles[y] = [];
      for (let x: number = 0; x < this._tilesWidth; x++) {
        const blocked = 0;
        this._tiles[y][x] = blocked;
      }
    }
  }

  /**
   * Check if there is a player or block on tile.
   */
  private checkTile(x: number, y: number): boolean {
    if (this._tiles[x][y] === typeof String) return false;
    else return this._tiles[x][y] === 0;
  }

  /**
   * Set block on tile.
   */
  public setBlock(x: number, y: number, playerId: any = 1): void {
    this._tiles[x][y] = playerId;
  }

  /**
   * Remove block from tile.
   */
  public removeBlock(x: number, y: number): void {
    this._tiles[x][y] = 0;
  }

  /**
   * Returns a player from specified position.
   * @param x
   * @param y
   * @returns {Player | undefined}
   */
  public getPlayer(x: number, y: number): Player | undefined {
    const playerId = this._tiles[x][y];
    const player = this._state.players.get(playerId);
    return player;
  }

  /**
   * Move player on grid.
   */
  public movePlayer(player: Player, heading: Heading): boolean {
    switch (heading) {
      case Heading.DOWN:
        if (this.checkTile(player.x, player.y + 1)) {
          this._tiles[player.x][player.y] = 0;
          this._tiles[player.x][player.y + 1] = player.playerId;
          player.y++;
          return true;
        }
        break;
      case Heading.UP:
        if (this.checkTile(player.x, player.y - 1)) {
          this._tiles[player.x][player.y] = 0;
          this._tiles[player.x][player.y - 1] = player.playerId;
          player.y--;
          return true;
        }
        break;
      case Heading.LEFT:
        if (this.checkTile(player.x - 1, player.y)) {
          this._tiles[player.x][player.y] = 0;
          this._tiles[player.x - 1][player.y] = player.playerId;
          player.x--;
          return true;
        }
        break;
      case Heading.RIGHT:
        if (this.checkTile(player.x + 1, player.y)) {
          this._tiles[player.x][player.y] = 0;
          this._tiles[player.x + 1][player.y] = player.playerId;
          player.x++;
          return true;
        }
        break;
    }
    return false;
  }

  /**
   * Load map blockings.
   */
  public loadMapBlockings(mapInfo: any): void {
    for (let y = 0; y < this._tilesHeight; y++) {
      for (let x = 0; x < this._tilesWidth; x++) {
        const tileInfo = mapInfo[x * this._tilesHeight + y];
        this._tiles[y][x] = tileInfo > 0 ? 1 : 0;
      }
    }
  }
}

import { Command } from "@colyseus/command";
import { Client } from "colyseus";
import IArgentumArenaState from "../../shared/schemas/IArgentumArenaState";
import TargetActionType from "../enums/TargetActionType";
import Color from "../../shared/enums/Color";
import { SELECTED_SPELL_STRING } from "../../shared/i18n/Strings";

const TAG = "[SelectSpellCommand]";

type SelectSpellPayload = {
  spellId: number;
  client: Client;
};

export default class SelectSpellCommand extends Command<
  IArgentumArenaState,
  SelectSpellPayload
> {
  public async execute(payload: SelectSpellPayload): Promise<void> {
    const { client, spellId } = payload;
    const player = this.state.players.get(client.sessionId)!;

    player.state.setTargetActionType(TargetActionType.CAST_SPELL);
    player.state.setSelectedSpellId(spellId);

    player.sendi18n(SELECTED_SPELL_STRING, Color.INFO);
  }
}

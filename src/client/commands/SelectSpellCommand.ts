import Command from "./base/Command";
import Messages from "../../shared/enums/Messages";
import SpellsScene from "../scenes/SpellsScene";

const TAG = "[SelectSpellCommand]";

type SelectSpellPayload = {
  spellId: number;
};

export default class SelectSpellCommand extends Command<
  SpellsScene,
  SelectSpellPayload
> {
  public execute(scene: SpellsScene, payload: SelectSpellPayload): void {
    const { spellId } = payload;
    const clientService = scene.getClientService();

    clientService?.send(Messages.SelectSpell, { spellId });
  }
}

import { Command } from "@colyseus/command";
import Color from "../../shared/enums/Color";
import Messages from "../../shared/enums/Messages";
import { INSUFFICIENT_MANA_STRING } from "../../shared/i18n/Strings";
import IArgentumArenaState from "../../shared/schemas/IArgentumArenaState";
import Player from "../../shared/schemas/Player";

// TODO: cargar en argentumarenastate
import spells from "../data/spells.json";

const TAG = "[CastSpellCommand]";

type CastSpellPayload = {
  caster: Player;
  target: Player;
};

export default class CastSpellCommand extends Command<
  IArgentumArenaState,
  CastSpellPayload
> {
  public execute(payload: CastSpellPayload): void {
    const { caster, target } = payload;

    const spell = spells.data.find(
      (s) => s.id === caster.state.getSelectedSpellId()
    );

    if (spell) {
      if (caster.state.getCurrentMana() < spell.mana) {
        caster.sendi18n(INSUFFICIENT_MANA_STRING, Color.INFO);
        return;
      }

      caster.state.modCurrentMana(-spell.mana);
      caster.state.setSelectedSpellId(0);
      caster.sendUpdatedState();

      // TODO: calculate damage
      //
      const damage = Math.ceil((spell.minDamage + spell.maxDamage) / 2);

      target.state.modCurrentHealth(-damage);
      target.sendUpdatedState();

      caster.sendi18n(spell.casterMessage, Color.YELLOW, target.username);
      // TODO: i18n
      caster.send(Messages.WriteConsole, {
        message: `Le has quitado ${damage} puntos de vida a ${target.username}.`,
        color: Color.YELLOW,
      });

      target.sendi18n(spell.targetMessage, Color.RED, caster.username);

      // TODO: i18n
      target.send(Messages.WriteConsole, {
        message: `${caster.username} te ha quitado ${damage} puntos de vida.`,
        color: Color.RED,
      });

      this.state.players.forEach((player) => {
        // TODO: broadcast soundEffect

        player.send(Messages.PlayAnimation, {
          playerId: target.playerId,
          animationId: spell.animationId,
        });

        player.send(Messages.SetChatText, {
          playerId: caster.playerId,
          message: spell.magicWords,
          color: Color.YELLOW,
        });

        player.send(Messages.SetCombatText, {
          playerId: target.playerId,
          value: -damage,
        });
      });
    }
  }
}

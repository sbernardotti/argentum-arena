import CharacterClass from "../../shared/enums/CharacterClass";
import CharacterRace from "../../shared/enums/CharacterRace";
import PlayerState from "../states/PlayerState";

// TODO: cargar en argentumarenastate
import balance from "../data/balance.json";

const TAG = "[LoadStats]";

export default function loadStats(
  state: PlayerState,
  charClass: CharacterClass,
  charRace: CharacterRace
): void {
  switch (charClass) {
    case CharacterClass.Archer:
      console.log(TAG, balance.ARCHER["HUMAN"]);
      break;

    case CharacterClass.Assassin:
      break;

    case CharacterClass.Bard:
      break;

    case CharacterClass.Cleric:
      break;

    case CharacterClass.Paladin:
      break;

    case CharacterClass.Warrior:
      break;

    case CharacterClass.Wizard:
      break;
  }
}

import Character from "../entities/Character";

const TAG = "[sortCharacters]";

export default function sortCharacters(characters: Character[]): void {
  let i = 1;
  while (i < characters.length) {
    let j = i;

    while (
      j > 0 &&
      characters[j - 1].getPosition().y > characters[j].getPosition().y
    ) {
      const a = characters[j];
      const b = characters[j - 1];

      characters[j] = b;
      characters[j - 1] = a;

      j -= 1;
    }

    i += 1;
  }
}

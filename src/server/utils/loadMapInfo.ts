import * as map1 from "../data/maps/map1.json";

const TAG = "[loadMapInfo]";

// TODO: cargar y devolver translados, zonas de combate

export default function loadMapInfo(map: number): any {
  switch (map) {
    case 1:
      return map1.layers[3].data;
      break;
  }
}

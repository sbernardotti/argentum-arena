import "regenerator-runtime/runtime";
import Phaser from "phaser";
import GridEngine from "grid-engine";
import BootScene from "./scenes/BootScene";
import LoginScene from "./scenes/LoginScene";
import MainScene from "./scenes/MainScene";
import UIScene from "./scenes/UIScene";
import InventoryScene from "./scenes/InventoryScene";
import SpellsScene from "./scenes/SpellsScene";

const TAG = "[Main]";

const config: Phaser.Types.Core.GameConfig = {
  title: "ArgentumArena",
  type: Phaser.AUTO,
  dom: {
    createContainer: true,
  },
  callbacks: {
    postBoot: (game) => {
      game.domContainer.style.pointerEvents = "none";
    },
  },
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    width: 1024,
    height: 720,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  plugins: {
    scene: [
      {
        key: "gridEngine",
        plugin: GridEngine,
        mapping: "gridEngine",
      },
    ],
  },
  parent: "client",
  backgroundColor: "#000000",
  scene: [
    BootScene,
    LoginScene,
    MainScene,
    UIScene,
    InventoryScene,
    SpellsScene,
  ],
};

export const game = new Phaser.Game(config);

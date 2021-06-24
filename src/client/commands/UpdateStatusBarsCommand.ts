import Command from "./base/Command";
import UIScene from "../scenes/UIScene";

const TAG = "[UpdateStatusBarsCommand]";

type UpdateStatusBarsPayload = {
  health: number;
  currentHealth: number;
  mana: number;
  currentMana: number;
  stamina: number;
  currentStamina: number;
};

export default class UpdateStatusBarsCommand extends Command<
  UIScene,
  UpdateStatusBarsPayload
> {
  public execute(scene: UIScene, payload: UpdateStatusBarsPayload): void {
    const {
      health,
      currentHealth,
      mana,
      currentMana,
      stamina,
      currentStamina,
    } = payload;

    scene.getHealthBar().update(currentHealth, health);
    scene.getManaBar().update(currentMana, mana);
    scene.getStaminaBar().update(currentStamina, stamina);
  }
}

import Phaser from "phaser";
import SceneData from "../types/SceneData";
import BaseScene from "./BaseScene";

const TAG = "[LoginScene]";

export default class LoginScene extends BaseScene {
  private _form?: Phaser.GameObjects.DOMElement;

  constructor() {
    super("loginScene");
  }

  private async login(username: string): Promise<void> {
    // TODO: guardar en localStorage para recordar nick
    //
    try {
      const service = this._clientService;
      await service?.join(username);
      this._form!.setVisible(false);
      this.scene.launch("mainScene", {
        clientService: service,
      });

      this.scene.launch("uiScene", { clientService: service });
      this.scene.stop();
    } catch (err) {
      console.error(TAG, err);
    }
  }

  public create(data: SceneData): void {
    const { clientService } = data;

    this._clientService = clientService;

    // UI
    this._form = this.add.dom(512, 360).createFromCache("loginForm");
    this._form.addListener("click");
    this._form.on("click", (event: any) => {
      if (event.target.name === "loginButton") {
        const inputUsername = this._form!.getChildByName(
          "username"
        ) as HTMLInputElement;

        this.login(inputUsername.value);
      }
    });
  }

  public update(time: number, delta: number): void {}
}

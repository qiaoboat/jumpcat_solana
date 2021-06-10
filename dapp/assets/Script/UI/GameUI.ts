import { Handler } from "../Framework/Handler";
import { EventManager } from "../Manager/EventManager";
import { EventMessageType } from "../Manager/EventMessageType";
import BaseModuleUI from "./BaseModuleUI";
import GameManager from "../Manager/GameManager";

export default class GameUI extends BaseModuleUI {
    aText: fgui.GTextField;
    bText: fgui.GTextField;
    priceText: fgui.GTextField;
    aButton: fgui.GButton;
    bButton: fgui.GButton;
    constructor() {
        super("Game");
        EventManager.Instance.AddEventListener(EventMessageType.GameStart, new Handler(this, this.onGameStart));
    }

    private onGameStart(messageType: EventMessageType, args: unknown[]) {
        this.view.visible = true;
    }

    public onUILoaded(): void {
        super.onUILoaded();
        this.aText = this.view.getChild("A").asTextField;
        this.bText = this.view.getChild("B").asTextField;
        this.priceText = this.view.getChild("Price").asTextField;
        this.aButton = this.view.getChild("AButton").asButton;
        this.bButton = this.view.getChild("BButton").asButton;

        const handle = new Handler(this, function () {
            GameManager.Instance.ui.MessageBoxHide();
        });

        this.aButton.onClick(function () {
            GameManager.Instance.ui.MessageBoxShow("A -> Go Go!", "Go", ["test"], [handle]);
        }, this);
        this.bButton.onClick(function () {
            GameManager.Instance.ui.MessageBoxShow("B -> Go Go!", "Go");
        }, this);
        this.view.visible = true;
    }

    Update(): void {
        if (!this.view.visible) return;
    }
}

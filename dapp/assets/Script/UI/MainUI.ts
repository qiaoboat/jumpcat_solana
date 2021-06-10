import { Handler } from "../Framework/Handler";
import GameManager from "../Manager/GameManager";
import GameUI from "./GameUI";
import { MessageWindow } from "./Window/MessageWindow";

fgui.UIConfig.modalLayerColor = cc.color(0, 0, 0, 0.7);
fgui.UIConfig.bringWindowToFrontOnClick = false;

export default class MainUI {
    public gameUI: GameUI;
    private m_messageWindow: MessageWindow;
    public isLoaded = false;

    constructor() {
        this.gameUI = new GameUI();
        if (cc.sys.isBrowser) window["MainUI"] = this;
    }

    public MessageBoxShow(text = "", title = "", buttonNames: string[] = [], handles: Handler[] = []): void {
        if (!this.m_messageWindow) return;

        this.m_messageWindow.config(text, title, buttonNames, handles);
        this.m_messageWindow.show();
    }

    public MessageBoxHide(): void {
        if (!this.m_messageWindow) return;

        this.m_messageWindow.hide();
    }

    public IsMessageBoxShow(): boolean {
        if (!this.m_messageWindow) return false;
        return this.m_messageWindow.isShowing;
    }

    Init(): void {
        fgui.GRoot.create();
        const self = this;
        fgui.UIPackage.loadPackage("UI/Main", function (err) {
            self.onUILoaded();
            self.isLoaded = true;
        });
    }

    onUILoaded(): void {
        this.gameUI.onUILoaded();

        this.m_messageWindow = new MessageWindow();
        this.m_messageWindow.init(); // => oninit
    }

    Update(): void {
        if (!this.isLoaded) return;
        this.gameUI.Update();
    }
}

const { ccclass, property } = cc._decorator;

import { Time } from "./Framework/Time";
import GameManager from "./Manager/GameManager";
import MainUI from "./UI/MainUI";

@ccclass
export default class MainCom extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    @property({ type: cc.TTFFont })
    private font: cc.TTFFont = null;

    start(): void {
        if (this.font) {
            fgui.registerFont("myFont", this.font);
            fgui.UIConfig.defaultFont = "myFont";
        }

        fgui.GRoot.create();
        GameManager.Instance.ui = new MainUI();
        GameManager.Instance.ui.Init();
    }

    update(deltaTime: number): void {
        Time.deltaTime = deltaTime;
    }
}

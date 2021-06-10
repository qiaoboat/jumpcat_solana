import { Handler } from "../Framework/Handler";
import MainUI from "../UI/MainUI";
import { EventManager } from "./EventManager";
import { EventMessageType } from "./EventMessageType";

export enum GameState {
    Init,
    Play,
    Over,
}

export default class GameManager {
    private static _instance: GameManager = null;
    public ui: MainUI;
    private m_gameState: GameState = GameState.Init;

    public static get Instance(): GameManager {
        return this._instance || (this._instance = new GameManager());
    }

    public StartGame(): void {
        cc.log("StartGame");
        this.m_gameState = GameState.Play;
        EventManager.Instance.DoEvent(EventMessageType.GameStart);
    }

    public IsInGaming(): boolean {
        return this.m_gameState == GameState.Play;
    }

    public GameOver(isWin: boolean): void {
        this.m_gameState = GameState.Over;
        const handle = new Handler(this, function () {
            this.StartGame();
            GameManager.Instance.ui.MessageBoxHide();
        });
        this.ui.MessageBoxShow(isWin ? "胜利" : "失败", "游戏结束", ["重新开始"], [handle]);
    }
}

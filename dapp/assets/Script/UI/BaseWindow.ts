export class BaseWindow extends fgui.Window {
    windowName: string;
    public constructor(name: string) {
        super();
        this.windowName = name;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected Init(): void {}

    protected onInit(): void {
        this.contentPane = fgui.UIPackage.createObject("Main", this.windowName).asCom;
        this.modal = true;
        this.center();
        this.setPivot(0.5, 0.5);
        this.Init();
    }

    protected doShowAnimation(): void {
        this.onShown();
        this.setScale(0.1, 0.1);
        fgui.GTween.to2(0.1, 0.1, 1, 1, 0.34).setTarget(this, this.setScale).setEase(fgui.EaseType.BackOut);
    }

    protected doHideAnimation(): void {
        fgui.GTween.to2(1, 1, 0.1, 0.1, 0.4).setTarget(this, this.setScale).setEase(fgui.EaseType.BackIn).onComplete(this.hideImmediately, this);
    }
}

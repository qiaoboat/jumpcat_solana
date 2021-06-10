export default class BaseModuleUI {
    public view: fgui.GComponent = null;
    public name = "";

    constructor(name: string) {
        this.name = name;
        if (cc.sys.isBrowser) window[this.name + "UI"] = this;
    }

    public onUILoaded(): void {
        this.view = fgui.UIPackage.createObject("Main", this.name).asCom;
        this.view.makeFullScreen();
        this.view.name = this.name;
        fgui.GRoot.inst.addChild(this.view);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Update(): void {}
}

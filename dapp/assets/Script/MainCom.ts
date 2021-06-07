const { ccclass, property } = cc._decorator;


console.log("111", cc.resources);

@ccclass
export default class MainCom extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    @property({ type: cc.TTFFont })
    private font: cc.TTFFont = null;

    start() {
        if (this.font) {
            fgui.registerFont("myFont", this.font);
            fgui.UIConfig.defaultFont = "myFont";
        }

        console.log("0", cc.resources);
        fgui.GRoot.create();
        console.log("1");
        fgui.UIPackage.loadPackage("UI/Main", function (err) {
            console.log("2");
            let view: fgui.GComponent = fgui.UIPackage.createObject("Main", "Game").asCom;
            view.makeFullScreen();
            fgui.GRoot.inst.addChild(view);
        });
    }

    // update (dt) {}
}

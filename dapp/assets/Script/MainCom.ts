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

        fgui.GRoot.create();
        fgui.UIPackage.loadPackage("UI/Main", function (err) {
            let view: fgui.GComponent = fgui.UIPackage.createObject("Main", "Game").asCom;
            view.makeFullScreen();
            fgui.GRoot.inst.addChild(view);
            // console.log(cc.view.getFrameSize());
        });
    }

    // update (dt) {}
}

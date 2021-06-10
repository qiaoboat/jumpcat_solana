import { Handler } from "../../Framework/Handler";
import { BaseWindow } from "../BaseWindow";

export class MessageWindow extends BaseWindow {
    private m_text: fgui.GTextField;
    private m_title: fgui.GTextField;
    private m_list: fgui.GList;

    public constructor() {
        super("MessageWindow");
    }

    private onClickButton(evt: fgui.Event) {
        let button: fgui.GButton = fgui.GObject.cast(evt.currentTarget).asButton;
        console.log();
        let handle: Handler = button.data;
        if (!handle) this.hide();
        else {
            handle.run();
        }
    }

    public config(text = "", title = "", buttonNames: string[] = [], handles: Handler[] = []): void {
        if (handles.length != 0 && handles.length != buttonNames.length) {
            console.error("MessageWindow buttonNames same with handles");
            console.log(buttonNames);
            console.log(handles);
            return;
        }

        this.m_text.text = text;
        this.m_title.text = title;
        this.m_list.removeChildrenToPool();

        if (buttonNames.length == 0) {
            console.log(1);
            const buttonItem: fgui.GButton = this.m_list.addItemFromPool().asButton;
            buttonItem.offClick(this.onClickButton, this);
            buttonItem.title = "ok";
            buttonItem.getController("Type").selectedPage = "Ok";
            buttonItem.data = null
            buttonItem.onClick(this.onClickButton, this);
        } else {
            console.log(2);
            for (let index = 0; index < buttonNames.length; index++) {
                const element = buttonNames[index];
                console.log(3);
                const buttonItem: fgui.GButton = this.m_list.addItemFromPool().asButton;
                buttonItem.offClick(this.onClickButton, this);
                buttonItem.title = element;
                buttonItem.getController("Type").selectedPage = "Cancel";
                if (handles.length != 0) {
                    console.log(4);
                    if (handles[index] == null) {
                        buttonItem.data = null
                        buttonItem.onClick(this.onClickButton, this);
                    }

                    else {
                        const handle = handles[index];
                        buttonItem.data = handle
                        buttonItem.onClick(this.onClickButton, this);
                        buttonItem.getController("Type").selectedPage = "Ok";
                    }
                } else {
                    buttonItem.data = null
                    buttonItem.onClick(this.onClickButton, this);
                }
            }
        }
    }

    protected Init(): void {
        this.m_text = this.contentPane.getChild("Text").asTextField;
        this.m_title = this.contentPane.getChild("Title").asTextField;
        this.m_list = this.contentPane.getChild("List").asList;
    }
}

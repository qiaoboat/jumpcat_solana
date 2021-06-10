import { Random } from "./Random";

export class CTools {
    static get halfWidth(): number {
        return cc.view.getVisibleSize().width * 0.5;
    }

    static get halfHeight(): number {
        return cc.view.getVisibleSize().height * 0.5;
    }

    public static ShuffleList(list: unknown[]): void {
        for (let i = list.length; i > 0; i--) {
            const j = Random.RangeInt(0, i);
            const index = list[j];
            list[j] = list[i - 1];
            list[i - 1] = index;
        }
    }
}

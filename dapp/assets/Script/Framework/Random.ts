import { CTools } from "./CTools";

export class Random {
    public static get value(): number {
        return Random.RangeFloat(0, 1);
    }

    public static RangeFloat(a: number, b: number): number {
        return a < b ? Math.random() * (b - a) + a : Math.random() * (a - b) + b;
    }

    public static RangeInt(a: number, b: number): number {
        return a < b ? Math.floor(Math.random() * (b - a) + a) : Math.floor(Math.random() * (a - b) + b);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static Select(data: any[], defaultValue?: unknown): any {
        if (!data || data.length == 0) return defaultValue;

        const index: number = Random.RangeInt(0, data.length);
        return data[index];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static SelectSome(data: any[], count: number): any[] {
        if (!data || data.length == 0) return [];

        if (count > data.length || count == -1) count = data.length;

        const shuffleList = data;
        CTools.ShuffleList(shuffleList);
        return shuffleList.slice(0, count);
    }
}

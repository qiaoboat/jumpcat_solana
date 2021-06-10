export class List<T> extends Array<T> {
    constructor(array?: List<T> | Array<T>) {
        super();
        if (array) this.AddRange(array);
    }

    public get Count(): number {
        return this.length;
    }

    public Add(value: T): void {
        this.push(value);
    }

    public AddRange(array: List<T> | Array<T>): void {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            this.Add(element);
        }
    }

    public Clear(): void {
        this.splice(0, this.length);
    }

    public Contains(value: T): boolean {
        return this.indexOf(value) >= 0;
    }

    public IndexOf(value: T): number {
        return this.indexOf(value);
    }

    public Insert(index: number, value: T): void {
        this.splice(index, 0, value);
    }

    public LastIndexOf(value: T): number {
        return this.lastIndexOf(value);
    }

    public Remove(value: T): void {
        const index = this.indexOf(value);
        if (index >= 0) {
            this.splice(index, 1);
        }
    }

    public RemoveAt(index: number): void {
        this.splice(index, 1);
    }

    public Reverse(): void {
        this.reverse();
    }

    public Sort(): void {
        this.sort();
    }
}

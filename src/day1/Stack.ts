type Node<T> = {
    value: T;
    prev?: Node<T>;
};

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        const node: Node<T> = { value: item };
        this.length++;

        if (!this.head) {
            this.head = node;
        } else {
            node.prev = this.head;
            this.head = node;
        }
    }

    pop(): T | undefined {
        this.length = Math.max(0, this.length - 1);

        // Normally we would do this.length === 0 but cause typescript's null checks we do this
        if (!this.head) return undefined;

        const node = this.head;
        this.head = this.head.prev;

        // if no garbage collector, need to free
        node.prev = undefined;

        return node.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}

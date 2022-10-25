type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

const createNode = <V>(value: V): Node<V> => ({ value });

export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;

    private lookup: Map<K, Node<V>>;
    private reverseLookup: Map<Node<V>, K>;

    constructor(private capacity: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        // 1. does it exist
        // 2. insert if it does not exists (check capacity and evict if over)
        // 3. update to front and the value if it does exist

        let node = this.lookup.get(key);
        if (!node) {
            node = createNode(value);
            this.length++;
            this.prepend(node);
            this.trimCache();

            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
        } else {
            this.detach(node);
            this.prepend(node);
            node.value = value;
        }
    }

    get(key: K): V | undefined {
        // 1. check the cache for the existence
        const node = this.lookup.get(key);
        if (!node) return undefined;

        // 2. update the value we found and move it to the front
        this.detach(node);
        this.prepend(node);

        // 3. return the value if found else undefined
        return node.value;
    }

    private detach(node: Node<V>) {
        if (node.prev) node.prev.next = node.next;
        if (node.next) node.next.prev = node.prev;

        // this is done as a side effect of the next two if statements
        // if (this.length === 1) this.tail = this.head = undefined;

        if (this.head === node) this.head = this.head.next;
        if (this.tail === node) this.tail = this.tail.prev;
        node.next = node.prev = undefined;
    }

    private prepend(node: Node<V>) {
        if (!this.head) {
            this.head = this.tail = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
    }

    private trimCache() {
        if (this.length <= this.capacity) return;

        const tail = this.tail!;
        this.detach(tail);

        const key: K = this.reverseLookup.get(tail)!;
        this.lookup.delete(key);
        this.reverseLookup.delete(tail);
        this.length--;
    }
}

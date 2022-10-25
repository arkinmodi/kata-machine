export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    // BFS does not work for this because BFS does not preserve the shape of the tree
    //    5
    //  3   4
    //
    //      5
    //    3
    //  4
    //
    // BFS says the above two trees are equals
    // DFS preserves the shape of the tree (sand says the above two trees are not equal)

    if (a === null && b === null) return true;
    if (a === null || b === null) return false;
    if (a.value !== b.value) return false;

    return compare(a.left, b.left) && compare(a.right, b.right);
}

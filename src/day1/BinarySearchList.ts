export default function bs_list(haystack: number[], needle: number): boolean {
    let low = 0;
    let high = haystack.length;

    while (low < high) {
        const middle = Math.floor(low + (high - low) / 2);
        const value = haystack[middle];
        if (value === needle) {
            return true;
        } else if (value > needle) {
            high = middle;
        } else {
            // [low, high)
            low = middle + 1;
        }
    }
    return false;
}

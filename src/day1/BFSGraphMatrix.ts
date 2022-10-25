export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const prev: number[] = new Array(graph.length).fill(-1);

    seen[source] = true;
    const q = [source];

    do {
        const curr = q.shift()!;
        if (curr === needle) break;

        const adjs = graph[curr];
        for (let i = 0; i < adjs.length; ++i) {
            if (adjs[i] === 0 || seen[i]) continue;

            seen[i] = true;
            prev[i] = curr;
            q.push(i);
        }

        seen[curr] = true;
    } while (q.length);

    // if (prev[needle] === -1) return null;

    let curr = needle;
    const out: number[] = [];

    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    // return [source].concat(out.reverse());
    return out.length ? [source].concat(out.reverse()) : null;
}

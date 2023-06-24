export function random(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function randomk(arr: string[], amt: number, noSep: boolean) {
    let out = "";
    for (let i = 0; i < amt - 1; i++) {
        out += random(arr) + (noSep ? "" : " ");
    }

    out += random(arr);

    return out;
}

export function drop(arr: string[], itm: string) {
    let i = arr.indexOf(itm);
    return arr.slice(0, i).concat(arr.slice(i + 1));
}
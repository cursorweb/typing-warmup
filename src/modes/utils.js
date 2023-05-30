export function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function randomk(arr, amt, sep = true) {
    let out = "";
    for (let i = 0; i < amt - 1; i++) {
        out += random(arr) + (sep ? " " : "");
    }

    out += random(arr);

    return out;
}

import { warmups } from "../modes/warmups.js";
import { TestResult } from "./test-result.js";
import { TynputListener } from "./tynput.js";

function randomk(arr, amt, sep = true) {
    let out = "";
    for (let i = 0; i < amt - 1; i++) {
        out += random(arr) + (sep ? " " : "");
    }

    out += random(arr);

    return out;
}

export class WarmUpGenerator {
    constructor(name) {
        this.warmup = warmups[name];
        this.warmupIndex = 0;
        this.testResults = [];
        this.listener = new TynputListener();
    }

    init() {
        const warmup = this.warmup[this.warmupIndex];
        this.listener.newTest(warmup.name, );
    }

    genText(list) {

    }
}
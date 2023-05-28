import { warmups } from "../modes/warmups.js";
import { TynputListener } from "./tynput.js";
import { randomk } from "./utils.js";

export class WarmUpGenerator {
    constructor(name) {
        this.warmup = warmups[name];
        this.warmupIndex = 0;
        this.testResults = [];
        this.listener = new TynputListener();

        this.listener.onEnd(res => {
            this.warmupIndex++;
            this.testResults.push(res);
            this.makeTest();
        });
    }

    makeTest() {
        const warmup = this.warmup[this.warmupIndex];
        const text = this.genText(warmup);
        this.listener.newTest(warmup.name, text);
    }

    genText(warmup) {
        const list = warmup.list;
        return randomk(list, 50, !warmup.noSpace);
    }
}
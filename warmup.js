import { warmups } from "./modes/warmups.js";
import { TestResult } from "./test-result.js";

export class WarmUpGenerator {
    constructor(name) {
        this.warmup = warmups[name];
        this.warmupIndex = 0;
        this.testResults = [];
    }
}
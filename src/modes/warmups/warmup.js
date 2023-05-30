import { warmups } from "./data.js";
import { pages, transition, resultsCont } from "../../pages.js";
import { TestResult } from "../../typing/test-result.js";
import { randomk } from "../utils.js";
import { TypeMode } from "../mode.js";

export class WarmUpGenerator extends TypeMode {
    constructor(idx) {
        super();
        this.warmup = warmups[idx];
        this.warmupIndex = 0;
        this.testResults = [];

        this.listener.onEnd(res => {
            this.testResults.push(res);
            this.begin();
            this.warmupIndex++;
            if (this.warmupIndex >= this.warmup.tests.length) {
                console.log(this.testResults);

                const resultEls = [];
                for (const result of this.testResults) {
                    resultEls.push(this.createResultEl(result));
                }

                resultsCont.append(...resultEls);
                transition(pages.typing, pages.results);
            }
        });
    }

    begin() {
        const warmup = this.warmup.tests[this.warmupIndex];
        const text = this.genText(warmup);
        this.listener.newTest(warmup.name, text);
    }

    genText(warmup) {
        const list = warmup.list;
        return randomk(list, 1, warmup.noSpace);
    }
}
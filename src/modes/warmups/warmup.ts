import { IWarmup, warmups } from "./data";
import { pages, transition, resultsCont } from "../../pages";
import { TypeMode } from "../mode";
import { TestResult } from "../../typing/test-result";

export class WarmUpGenerator extends TypeMode {
    warmup: IWarmup;
    warmupIndex: number;
    testResults: TestResult[];

    constructor(idx: number) {
        super();
        this.warmup = warmups[idx];
        this.warmupIndex = 0;
        this.testResults = [];

        this.listener.onEnd(res => {
            this.warmupIndex++;
            this.testResults.push(res);
            if (this.warmupIndex >= this.warmup.tests.length) {
                const resultEls = [];
                for (const result of this.testResults) {
                    resultEls.push(this.createResultEl(result));
                }

                resultsCont.append(...resultEls);
                transition(pages.results);

                this.warmupIndex = 0;
                this.testResults = [];
                return;
            }

            this.begin();
        }, false);
    }

    begin() {
        const warmup = this.warmup.tests[this.warmupIndex];
        const text = this.genText(warmup.list, warmup.noSpace);
        this.listener.newTest(warmup.title, text);
    }
}
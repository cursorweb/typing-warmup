import { IWarmup, warmups } from "./data";
import { pages, transition, resultsCont } from "../../pages";
import { TypeMode } from "../mode";

export class WarmUpGenerator extends TypeMode {
    warmup: IWarmup;
    warmupIndex: number;
    testResults: any[];

    constructor(idx: number) {
        super();
        this.warmup = warmups[idx];
        this.warmupIndex = 0;
        this.testResults = [];

        // alert(this.warmup.tests.length);

        this.listener.onEnd(res => {
            this.warmupIndex++;
            // alert(JSON.stringify(res));
            this.testResults.push(res);
            if (this.warmupIndex >= this.warmup.tests.length) {
                // alert('done!')
                // console.log(this.testResults);

                const resultEls = [];
                for (const result of this.testResults) {
                    resultEls.push(this.createResultEl(result));
                }

                resultsCont.append(...resultEls);
                transition(pages.typing, pages.results);
                return;
            }

            this.begin();
        });
    }

    begin() {
        const warmup = this.warmup.tests[this.warmupIndex];
        const text = this.genText(warmup.list, warmup.noSpace);
        this.listener.newTest(warmup.title, text);
    }
}
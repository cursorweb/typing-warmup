import { warmups } from "./data.js";
import { pages, transition, resultsCont } from "../../pages.js";
import { TestResult } from "../../typing/test-result.js";
import { TynputListener } from "../../typing/tynput.js";
import { randomk } from "../utils.js";

export class WarmUpGenerator {
    constructor(idx) {
        this.warmup = warmups[idx];
        this.warmupIndex = 0;
        this.testResults = [];
        this.listener = new TynputListener();

        this.listener.onEnd(res => {
            this.testResults.push(res);
            this.makeTest();
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

    makeTest() {
        const warmup = this.warmup.tests[this.warmupIndex];
        const text = this.genText(warmup);
        this.listener.newTest(warmup.name, text);
    }

    genText(warmup) {
        const list = warmup.list;
        return randomk(list, 1, !warmup.noSpace);
    }

    /**
     * Create result
     * @param {TestResult} result Result
     * @returns {HTMLDivElement}
     */
    createResultEl(result) {
        const wpm = result.calcWpm();
        const acc = result.calcAcc();
        const title = result.name;

        const wpmResultEl = document.createElement("div");
        wpmResultEl.classList.add("wpmresult");

        const titleEl = document.createElement("div");
        titleEl.textContent = title;

        const wpmEl = document.createElement("div");
        wpmEl.textContent = "WPM: " + wpm.toFixed(2);

        const accEl = document.createElement("div");
        accEl.textContent = "Acc: " + acc.toFixed(2);

        wpmResultEl.append(titleEl, wpmEl, accEl);
        return wpmResultEl;
    }
}
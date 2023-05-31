import { TestResult } from "../typing/test-result";
import { TynputListener, tynput } from "../typing/tynput";
import { randomk } from "./utils";

/** TODO REMOVE */
const DEBUG_AMT = 50;

export abstract class TypeMode {
    listener: TynputListener;

    constructor() {
        this.listener = new TynputListener();
    }

    /**
     * @abstract
     */
    begin() {}

    /**
     * Don't forget to make this null!
     */
    end() {
        tynput.clear();
    }

    genText(list: string[], space: boolean, amt = DEBUG_AMT) {
        return randomk(list, amt, space);
    }
    
    createResultEl(result: TestResult) {
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
import { TynputListener, tynput } from "../typing/tynput.js";
import { randomk } from "./utils.js";

/** TODO REMOVE */
const DEBUG_AMT = 50;

export class TypeMode {
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

    genText(list, space, amt = DEBUG_AMT) {
        return randomk(list, amt, space);
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
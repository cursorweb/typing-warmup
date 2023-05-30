import { TynputListener, tynput } from "../typing/tynput.js";

export class TypeMode {
    constructor() {
        this.listener = new TynputListener();
    }

    /**
     * @abstract
     */
    begin() {}

    /**
     * Don't forget to make null!
     */
    end() {
        tynput.clear();
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
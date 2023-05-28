import { TestResult } from "./test-result";

/*
Typing Input Manager
This manages the text box and what the user sees.
A singleton - ish type class

Exposes the 'listener' class which is the primary way to communicate between the two.
*/
class TynputManager {
    constructor() {
        /**
         * @type {HTMLInputElement}
         */
        this.inputEl = document.querySelector(".user-input");

        /**
         * @type {HTMLDivElement}
         */
        this.testCont = document.querySelector(".test-cont");

        /**
         * @type {HTMLDivElement}
         */
        this.focusOverlay = document.querySelector(".overlay");
    }

    init() {
        this.inputEl.addEventListener("focus", () => {
            this.focusOverlay.style.display = "none";
        });

        this.inputEl.addEventListener("blur", () => {
            this.focusOverlay.style.display = "flex";
        });

        this.inputEl.addEventListener("keydown", e => {
            const idx = this.cIdx;
            if (e.key == "Backspace") {
                if (idx == 0) return;
                this.els[idx].classList.remove("curr", "wrong", "correct");
                idx--;
                this.els[idx].classList.remove("wrong", "correct");
                this.els[idx].classList.add("curr");
            }

            // not a typed key, or command (could happen!)
            if (e.key.length != 1 || e.altKey || e.ctrlKey || e.metaKey) {
                return;
            }

            if (idx == 0) {
                this.testResult.begin();
            }

            this.els[idx].classList.remove("curr");

            if (this.text[idx] == e.key) {
                this.els[idx].classList.add("correct");
                this.testResult.correct++;
            } else {
                this.els[idx].classList.add("wrong");
                this.testResult.wrong++;
            }

            this.testResult.chars++;
            idx++;
            if (idx >= this.els.length) {
                this.testResult.end();
                this.listener.onEnd(this.testResult, this);
            }

            this.els[idx].classList.add("curr");
        });
    }

    /**
     * Create a new test
     * @param {string} title title
     * @param {string} text text
     * @param {TynputListener} listener listener
     */
    newTest(title, text, listener = this.listener) {
        this.cIdx = 0;
        this.text = text;
        this.listener = listener;
        this.testResult = new TestResult(title);

        const chars = text.split("");
        this.els = [];
        for (const char of chars) {
            const el = document.createElement("pre");
            el.textContent = char;
            el.classList.add("char");

            if (char == " ") {
                el.classList.add("space");
            }

            this.els.push(el);
        }

        this.els[0].classList.add("curr");
        this.testCont.append(...this.els);
    }
}

const tynput = new TynputManager();

export class TynputListener {
    constructor() {
        this.tynput = tynput;
    }

    onEnd(_testResult, _manager) { }
    clear() {
        // todos
    }
}
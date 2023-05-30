import { TestResult } from "./test-result.js";

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

        this.testTitle = document.querySelector(".test-title");

        this.tynputFocused = true;

        this.focusTynput();
        document.addEventListener("keydown", this.focusTynput.bind(this));

        this.testCont.addEventListener("click", this.focusTynput.bind(this));
        this.focusOverlay.addEventListener("click", this.focusTynput.bind(this));

        this.inputEl.addEventListener("focus", () => {
            this.focusOverlay.style.display = "none";
        });

        this.inputEl.addEventListener("blur", () => {
            this.focusOverlay.style.display = "flex";
        });

        this.inputEl.addEventListener("keydown", e => {
            if (e.key == "Backspace") {
                if (this.cIdx == 0) return;
                this.els[this.cIdx].classList.remove("curr", "wrong", "correct");
                this.cIdx--;
                this.els[this.cIdx].classList.remove("wrong", "correct");
                this.els[this.cIdx].classList.add("curr");
            }

            // not a typed key, or command (could happen!)
            if (e.key.length != 1 || e.altKey || e.ctrlKey || e.metaKey) {
                return;
            }

            if (this.cIdx == 0 && !e.shiftKey) {
                this.testResult.begin();
            }

            this.els[this.cIdx].classList.remove("curr");

            if (this.text[this.cIdx] == e.key) {
                this.els[this.cIdx].classList.add("correct");
                this.testResult.correct++;
            } else {
                this.els[this.cIdx].classList.add("wrong");
                this.testResult.wrong++;
            }

            this.testResult.chars++;
            this.cIdx++;
            if (this.cIdx >= this.els.length) {
                this.testResult.end();
                this.listener._endTest(this.testResult);
                return;
            }

            this.els[this.cIdx].classList.add("curr");
        });
    }

    focusTynput() {
        this.inputEl.focus();
        this.focusOverlay.style.display = "none";
    }

    /**
     * Create a new test
     * @param {string} title title
     * @param {string} text text
     * @param {TynputListener} listener listener
     */
    newTest(title, text, listener) {
        this.clear();
        this.testTitle.textContent = title;
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
    
    clear() {
        this.cIdx = 0;
        this.testResult = null;
        this.testCont.textContent = "";
    }
}

export const tynput = new TynputManager();

export class TynputListener {
    newTest(title, text) {
        tynput.newTest(title, text, this);
    }

    _endTest(testResult) {
        this.endFn(testResult);
    }

    /**
     * When a test has been completed
     * @param {(result: TestResult) => void} endFn handler
     */
    onEnd(endFn) {
        this.endFn = endFn;
    }
}
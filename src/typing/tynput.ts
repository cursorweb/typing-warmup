import { TestResult } from "./test-result";

/*
Typing Input Manager
This manages the text box and what the user sees.
A singleton - ish type class

Exposes the 'listener' class which is the primary way to communicate between the two.
*/
class TynputManager {
    inputEl: HTMLInputElement;
    testCont: HTMLDivElement;
    focusOverlay: HTMLDivElement;
    testTitle: HTMLDivElement;
    tynputFocused: boolean;
    cIdx: number;
    els: Element[];
    testResult: TestResult;
    text: string;
    listener: TynputListener;

    constructor() {
        this.inputEl = document.querySelector(".user-input");
        this.testCont = document.querySelector(".test-cont");
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

        this.inputEl.addEventListener("keydown", (e: { key: string | any[]; altKey: any; ctrlKey: any; metaKey: any; shiftKey: any; }) => {
            if (e.key == "Backspace") {
                if (this.cIdx == 0) return;
                this.els[this.cIdx].classList.remove("curr", "wrong", "correct");
                this.cIdx--;
                this.els[this.cIdx].classList.remove("wrong", "correct");
                this.els[this.cIdx].classList.add("curr");
            }

            // not a typed key, or command (could happen!)
            if (e.key.length != 1 || e.altKey || e.ctrlKey || e.metaKey || e.key == "Shift") {
                return;
            }

            if (this.cIdx == 0) {
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

    newTest(title: string, text: string, listener: TynputListener) {
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
    newTest(title: string, text: string) {
        tynput.newTest(title, text, this);
    }

    _endTest(testResult: any) {
        this.endFn(testResult);
    }
    endFn(testResult: any) {
        throw new Error("Method not implemented.");
    }

    /**
     * When a test has been completed
     * @param {(result: TestResult) => void} endFn handler
     */
    onEnd(endFn: { (res: any): void; (res: any): void; }) {
        this.endFn = endFn;
    }
}
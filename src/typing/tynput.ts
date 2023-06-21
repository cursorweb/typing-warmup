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
    text: string;

    testResult: TestResult;

    listener: TynputListener;

    /**
     * Pace WPM is the wpm the user wants to go
     * Pace Int will tick periodically (maybe account for drift?)
     * Pace Index is where the pace caret is.
     * All variables reset after every clear()
     */
    paceWpm?: number;
    paceInt?: ReturnType<typeof setInterval>;
    pIdx?: number;


    constructor() {
        this.inputEl = document.querySelector(".user-input");
        this.testCont = document.querySelector(".test-cont");
        this.focusOverlay = document.querySelector(".overlay");

        this.testTitle = document.querySelector(".test-title");

        this.focusTynput();
        document.addEventListener("keydown", this.focusTynput.bind(this));

        this.testCont.addEventListener("click", this.focusTynput.bind(this));
        this.focusOverlay.addEventListener("click", this.focusTynput.bind(this));

        this.inputEl.addEventListener("focus", () => {
            this.focusOverlay.style.display = "none";
            this.tynputFocused = true;
        });

        this.inputEl.addEventListener("blur", () => {
            this.focusOverlay.style.display = "flex";
            this.tynputFocused = false;
        });

        this.inputEl.addEventListener("keydown", e => {
            if (e.key == "Backspace") {
                if (this.cIdx == 0) return;
                this.els[this.cIdx].classList.remove("curr", "wrong", "correct");
                this.cIdx--;
                this.els[this.cIdx].classList.remove("wrong", "correct");
                this.els[this.cIdx].classList.add("curr");
            }
        });

        this.inputEl.addEventListener("input", () => {
            const key = this.inputEl.value.normalize();
            this.inputEl.value = "";

            if (this.cIdx == 0) {
                this.testResult.begin();
                if (this.paceWpm) {
                    this.initPaceCaret(this.paceWpm);
                }
            }

            this.els[this.cIdx].classList.remove("curr");

            if (this.text[this.cIdx] == key) {
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

    focusTynput(e: Event = null) {
        if (!this.tynputFocused) {
            e?.preventDefault();
            this.inputEl.focus();
            this.focusOverlay.style.display = "none";
        }
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

        if (this.paceInt) {
            clearInterval(this.paceInt);
            this.paceInt = null;
        }
    }

    createPacer(paceWpm: number) {
        this.paceWpm = paceWpm;
    }

    initPaceCaret(wpm = 0) {
        if (wpm == 0) {
            return;
        }

        this.pIdx = -1;

        this.pacerTick();
        this.paceInt = setInterval(this.pacerTick.bind(this), 60 * 1000 / (wpm * 5));
    }

    pacerTick() {
        this.els[this.pIdx]?.classList.remove("pace-caret");
        this.pIdx++;
        if (this.pIdx >= this.els.length) {
            clearInterval(this.paceInt);
            return;
        }
        this.els[this.pIdx].classList.add("pace-caret");
    }
}

export const tynput = new TynputManager();

export class TynputListener {
    endFn: (testResult: TestResult) => void;

    newTest(title: string, text: string) {
        tynput.newTest(title, text, this);
    }

    _endTest(testResult: TestResult) {
        this.endFn(testResult);
    }

    /**
     * When a test has been completed
     * @param endFn handler
     */
    onEnd(endFn: (testResult: TestResult) => void) {
        this.endFn = endFn;
    }
}
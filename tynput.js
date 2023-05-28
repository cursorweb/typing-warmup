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
    }

    newTest(text) {
        this.testIdx = 0;
        this.testText = text;

        const chars = text.split("");
        const els = [];
        for (const char of chars) {
            const el = document.createElement("pre");
            el.textContent = char;
            el.classList.add("char");

            if (char == " ") {
                el.classList.add("space");
            }

            els.push(el);
        }

        els[0].classList.add("curr");
        typingCont.append(...els);
    }
}

export const tynput = new TynputManager();

export class TynputListener {
    constructor() {
        this.tynput = tynput;
    }
}
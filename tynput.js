/*
Typing Input Manager
This manages the text box and what the user sees.
A singleton - ish type class
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
}

export const tynput = new TynputManager();
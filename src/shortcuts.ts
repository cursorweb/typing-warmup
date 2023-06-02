import { currentTest } from "./gen-selection";
import { tynput } from "./typing/tynput";

const resetBtn: HTMLButtonElement = document.querySelector(".shortcut-reset");
const exitBtn: HTMLButtonElement = document.querySelector(".shortcut-exit");

resetBtn.addEventListener("click", () => {
    currentTest.begin();
    tynput.focusTynput();
});

exitBtn.addEventListener("click", () => {

});

document.body.addEventListener("keydown", e => {
    if (e.key == "Tab") {
        e.preventDefault();
        resetBtn.click();
    }
});
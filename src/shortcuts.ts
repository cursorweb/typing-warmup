import { currentTest } from "./gen-selection";
import { pages, transition } from "./pages";
import { tynput } from "./typing/tynput";

const resetBtn: HTMLButtonElement = document.querySelector(".shortcut-reset");
const exitBtn: HTMLButtonElement = document.querySelector(".shortcut-exit");

resetBtn.addEventListener("click", () => {
    if (!currentTest) {
        return;
    }
    
    currentTest.begin();
    tynput.focusTynput();
    transition(pages.typing);
});

exitBtn.addEventListener("click", () => {

});

document.body.addEventListener("keydown", e => {
    if (e.key == "Tab") {
        e.preventDefault();
        resetBtn.click();
    }
});
import { tests } from "./modes/tests/data.js";
import { TestGenerator } from "./modes/tests/test.js";
import { warmups } from "./modes/warmups/data.js";
import { WarmUpGenerator } from "./modes/warmups/warmup.js";

const warmupsEl = document.querySelector(".warmup>.selection");
const testsEl = document.querySelector(".tests>.selection");
// const pacerEl = document.querySelector(".pacer>.selection");

let currentTest = null;

/**
 * List of Things.
 * @param {{title:string, desc:string}[]} list List
 * @param {(i: number) => void} onClick 
 * @returns List of Select-mode 'buttons'
 */
function elsFromList(list, onClick) {
    const out = [];
    for (let i = 0; i < list.length; i++) {
        const itm = list[i];
        const el = document.createElement("div");
        el.classList.add("select-mode");

        const title = document.createElement("div");
        title.classList.add("title");
        title.textContent = itm.title;

        const desc = document.createElement("div");
        desc.classList.add("desc");
        desc.textContent = itm.desc;

        el.append(title, desc);

        el.addEventListener("click", () => {
            currentTest?.end();
            onClick(i);
            currentTest.begin();
        });

        out.push(el);
    }

    return out;
}

warmupsEl.append(...elsFromList(warmups, i => {
    currentTest = new WarmUpGenerator(i);
}));

testsEl.append(...elsFromList(tests, i => {
    currentTest = new TestGenerator(i);
}));
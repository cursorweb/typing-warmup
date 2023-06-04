import { TypeMode } from "./modes/mode";
import { tests } from "./modes/tests/data";
import { TestGenerator } from "./modes/tests/test";
import { varData } from "./modes/tests/var-data";
import { VarTestGenerator } from "./modes/tests/var-test";
import { warmups } from "./modes/warmups/data";
import { WarmUpGenerator } from "./modes/warmups/warmup";
import { pages, transition } from "./pages";
import { tynput } from "./typing/tynput";

const warmupsEl = document.querySelector(".warmup>.selection");
const testsEl = document.querySelector(".tests>.selection");
// const pacerEl = document.querySelector(".pacer>.selection");

export let currentTest: TypeMode = null;

function elsFromList(list: {title:string, desc:string}[], onClick: (i: number) => void) {
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
            transition(pages.results, pages.typing);
            onClick(i);
            tynput.focusTynput();
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

testsEl.append(...elsFromList(varData, i => {
    currentTest = new VarTestGenerator(i);
}));
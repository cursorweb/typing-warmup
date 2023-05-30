import { tests } from "./tests/data.js";
import { warmups } from "./warmups/data.js";

const warmupsEl = document.querySelector(".warmup>.selection");
const testsEl = document.querySelector(".tests>.selection");
// const pacerEl = document.querySelector(".pacer>.selection");

function elsFromList(list) {
    const out = [];
    for (const itm of list) {
        const el = document.createElement("div");
        el.classList.add("mode");
        
        const title = document.createElement("div");
        title.classList.add("title");
        title.textContent = itm.title;

        const desc = document.createElement("div");
        desc.classList.add("desc");
        desc.textContent = itm.desc;

        el.append(title, desc);

        out.push(el);
    }

    return out;
}

warmupsEl.append(...elsFromList(warmups));
testsEl.append(...elsFromList(tests));
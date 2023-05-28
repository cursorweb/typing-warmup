const typingCont = document.querySelector(".typingcont");
const typingPageCont = document.querySelector(".typingpage-cont");
/**
 * @type {HTMLInputElement}
 */
const tynput = document.querySelector(".tynput");
const warmupTitle = document.querySelector(".warmuptitle");
const overlay = document.querySelector(".overlay");

const warmupExitBtn = document.querySelector(".warmup-exit");

const wpmResultsCont = document.querySelector(".wpmresults-cont");
const wpmResults = document.querySelector(".wpmresults");


function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomk(arr, amt, sep = true) {
    let out = "";
    for (let i = 0; i < amt - 1; i++) {
        out += random(arr) + (sep ? " " : "");
    }

    out += random(arr);

    return out;
}

function clearCont() {
    typingCont.textContent = "";
    cIdx = 0;
}

function generateEls(text) {
    const arr = text.split("");
    const els = [];

    for (const char of arr) {
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
    return els;
}

function getTestGen(idx) {
    return tests[testOrder[idx]];
}

/**
 * Create a pretty div
 * @param result {TestResult}
 * @returns {HTMLDivElement}
 */
function createWpmResult(result) {
    const wpm = result.calcWpm();
    const acc = result.calcAcc();
    const title = result.name;
    
    const wpmResultEl = document.createElement("div");
    wpmResultEl.classList.add("wpmresult");

    const titleEl = document.createElement("div");
    titleEl.textContent = title;

    const wpmEl = document.createElement("div");
    wpmEl.textContent = "WPM: " + wpm.toFixed(2);

    const accEl = document.createElement("div");
    accEl.textContent = "Acc: " + acc.toFixed(2);

    wpmResultEl.append(titleEl, wpmEl, accEl);
    return wpmResultEl;
}

function generateTest(wIdx) {
    const els = generateEls(getTestGen(wIdx)(wordAmt));
    const title = testTitles[testOrder[wIdx]];
    
    warmupTitle.textContent = title;
    const testResult = new TestResult(title);
    
    return [testResult, els];
}
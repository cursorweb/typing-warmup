/**
 * Char Index
 */
let cIdx = 0;
/**
 * Warm Up Index
 */
let wIdx = -1;

/**
 * Test Results
 * @type {TestResult[]}
 */
let testResults = [];
let testResult;
let els;

let tynputFocused = true;

focusTynput();
document.addEventListener("keydown", focusTynput);

typingCont.addEventListener("click", focusTynput);
overlay.addEventListener("click", focusTynput);

tynput.addEventListener("focus", () => {
    overlay.style.display = "none";
});

tynput.addEventListener("blur", () => {
    overlay.style.display = "flex";
});

tynput.addEventListener("keydown", e => {
    if (e.key == "Backspace") {
        if (cIdx == 0) return;
        els[cIdx].classList.remove("curr", "wrong", "correct");
        cIdx--;
        els[cIdx].classList.remove("wrong", "correct");
        els[cIdx].classList.add("curr");
    }

    // not a typed key, or command (could happen!)
    if (e.key.length != 1 || e.altKey || e.ctrlKey || e.metaKey) {
        return;
    }

    if (cIdx == 0) {
        testResult.begin();
    }

    els[cIdx].classList.remove("curr");

    if (els[cIdx].textContent == e.key) {
        els[cIdx].classList.add("correct");
        testResult.correct++;
    } else {
        els[cIdx].classList.add("wrong");
        testResult.wrong++;
    }

    testResult.chars++;
    cIdx++;
    if (cIdx >= els.length) {
        newTest();
    }

    els[cIdx].classList.add("curr");
});

newTest(true);

function newTest(first = false) {
    // if it is first, then you just generate the test, there's no previous test
    if (!first) {
        testResult.end();
        testResults.push(testResult);
    }

    clearCont();
    wIdx++;
    if (wIdx >= testOrder.length) {
        wpmResultsCont.style.display = "block";
        typingPageCont.style.display = "none";

        const results = [];
        for (const result of testResults) {
            results.push(createWpmResult(result));
        }
        wpmResults.append(...results);

        return;
    }

    [testResult, els] = generateTest(wIdx);
}

function focusTynput() {
    tynput.focus();
    overlay.style.display = "none";
}
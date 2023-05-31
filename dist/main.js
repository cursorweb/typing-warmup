/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gen-selection.js":
/*!******************************!*\
  !*** ./src/gen-selection.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modes_tests_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modes/tests/data.js */ \"./src/modes/tests/data.js\");\n/* harmony import */ var _modes_tests_test_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modes/tests/test.js */ \"./src/modes/tests/test.js\");\n/* harmony import */ var _modes_warmups_data_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modes/warmups/data.js */ \"./src/modes/warmups/data.js\");\n/* harmony import */ var _modes_warmups_warmup_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modes/warmups/warmup.js */ \"./src/modes/warmups/warmup.js\");\n\r\n\r\n\r\n\r\n\r\nconst warmupsEl = document.querySelector(\".warmup>.selection\");\r\nconst testsEl = document.querySelector(\".tests>.selection\");\r\n// const pacerEl = document.querySelector(\".pacer>.selection\");\r\n\r\nlet currentTest = null;\r\n\r\n/**\r\n * List of Things.\r\n * @param {{title:string, desc:string}[]} list List\r\n * @param {(i: number) => void} onClick \r\n * @returns List of Select-mode 'buttons'\r\n */\r\nfunction elsFromList(list, onClick) {\r\n    const out = [];\r\n    for (let i = 0; i < list.length; i++) {\r\n        const itm = list[i];\r\n        const el = document.createElement(\"div\");\r\n        el.classList.add(\"select-mode\");\r\n\r\n        const title = document.createElement(\"div\");\r\n        title.classList.add(\"title\");\r\n        title.textContent = itm.title;\r\n\r\n        const desc = document.createElement(\"div\");\r\n        desc.classList.add(\"desc\");\r\n        desc.textContent = itm.desc;\r\n\r\n        el.append(title, desc);\r\n\r\n        el.addEventListener(\"click\", () => {\r\n            currentTest?.end();\r\n            onClick(i);\r\n            currentTest.begin();\r\n        });\r\n\r\n        out.push(el);\r\n    }\r\n\r\n    return out;\r\n}\r\n\r\nwarmupsEl.append(...elsFromList(_modes_warmups_data_js__WEBPACK_IMPORTED_MODULE_2__.warmups, i => {\r\n    currentTest = new _modes_warmups_warmup_js__WEBPACK_IMPORTED_MODULE_3__.WarmUpGenerator(i);\r\n}));\r\n\r\ntestsEl.append(...elsFromList(_modes_tests_data_js__WEBPACK_IMPORTED_MODULE_0__.tests, i => {\r\n    currentTest = new _modes_tests_test_js__WEBPACK_IMPORTED_MODULE_1__.TestGenerator(i);\r\n}));\n\n//# sourceURL=webpack://typing-warmup/./src/gen-selection.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gen_selection_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gen-selection.js */ \"./src/gen-selection.js\");\n\r\nconsole.log('hello, world!');\n\n//# sourceURL=webpack://typing-warmup/./src/main.js?");

/***/ }),

/***/ "./src/modes/mode.js":
/*!***************************!*\
  !*** ./src/modes/mode.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TypeMode: () => (/* binding */ TypeMode)\n/* harmony export */ });\n/* harmony import */ var _typing_tynput_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../typing/tynput.js */ \"./src/typing/tynput.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ \"./src/modes/utils.js\");\n\r\n\r\n\r\n/** TODO REMOVE */\r\nconst DEBUG_AMT = 50;\r\n\r\nclass TypeMode {\r\n    constructor() {\r\n        this.listener = new _typing_tynput_js__WEBPACK_IMPORTED_MODULE_0__.TynputListener();\r\n    }\r\n\r\n    /**\r\n     * @abstract\r\n     */\r\n    begin() {}\r\n\r\n    /**\r\n     * Don't forget to make this null!\r\n     */\r\n    end() {\r\n        _typing_tynput_js__WEBPACK_IMPORTED_MODULE_0__.tynput.clear();\r\n    }\r\n\r\n    genText(list, space, amt = DEBUG_AMT) {\r\n        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.randomk)(list, amt, space);\r\n    }\r\n    \r\n    /**\r\n     * Create result\r\n     * @param {TestResult} result Result\r\n     * @returns {HTMLDivElement}\r\n     */\r\n    createResultEl(result) {\r\n        const wpm = result.calcWpm();\r\n        const acc = result.calcAcc();\r\n        const title = result.name;\r\n\r\n        const wpmResultEl = document.createElement(\"div\");\r\n        wpmResultEl.classList.add(\"wpmresult\");\r\n\r\n        const titleEl = document.createElement(\"div\");\r\n        titleEl.textContent = title;\r\n\r\n        const wpmEl = document.createElement(\"div\");\r\n        wpmEl.textContent = \"WPM: \" + wpm.toFixed(2);\r\n\r\n        const accEl = document.createElement(\"div\");\r\n        accEl.textContent = \"Acc: \" + acc.toFixed(2);\r\n\r\n        wpmResultEl.append(titleEl, wpmEl, accEl);\r\n        return wpmResultEl;\r\n    }\r\n}\n\n//# sourceURL=webpack://typing-warmup/./src/modes/mode.js?");

/***/ }),

/***/ "./src/modes/tests/data.js":
/*!*********************************!*\
  !*** ./src/modes/tests/data.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   tests: () => (/* binding */ tests)\n/* harmony export */ });\nconst tests = [\r\n    {\r\n        \"title\": \"Left Hand DV\",\r\n        \"desc\": \"Left Hand Only! (Dvorak Layout)\",\r\n        \"list\": [\"a\", \"o\", \"e\", \"u\", \"'\", \",\", \".\", \"p\", \"y\", \"i\", \";\", \"q\", \"j\", \"k\", \"x\", \"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"`\"],\r\n        \"noSpace\": true\r\n    },\r\n    {\r\n        \"title\": \"Right Hand DV\",\r\n        \"desc\": \"Right Hand Only! (Dvorak Layout)\",\r\n        \"list\": [\"d\", \"h\", \"t\", \"n\", \"s\", \"-\", \"f\", \"g\", \"c\", \"r\", \"l\", \"/\", \"=\", \"\\\\\", \"x\", \"b\", \"m\", \"w\", \"v\", \"z\", \"7\", \"8\", \"9\", \"0\", \"[\", \"]\"],\r\n        \"noSpace\": true\r\n    }\r\n    /*\r\n    \"Right Hand DV\": {\r\n\r\n    },\r\n    \"Left Hand QWERTY\": {\r\n\r\n    },\r\n    \"Right Hand QWERTY\": {\r\n\r\n    },\r\n    */\r\n];\n\n//# sourceURL=webpack://typing-warmup/./src/modes/tests/data.js?");

/***/ }),

/***/ "./src/modes/tests/test.js":
/*!*********************************!*\
  !*** ./src/modes/tests/test.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TestGenerator: () => (/* binding */ TestGenerator)\n/* harmony export */ });\n/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.js */ \"./src/modes/tests/data.js\");\n/* harmony import */ var _pages_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pages.js */ \"./src/pages.js\");\n/* harmony import */ var _mode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mode.js */ \"./src/modes/mode.js\");\n\r\n\r\n\r\n\r\nclass TestGenerator extends _mode_js__WEBPACK_IMPORTED_MODULE_2__.TypeMode {\r\n    constructor(idx) {\r\n        super();\r\n        this.test = _data_js__WEBPACK_IMPORTED_MODULE_0__.tests[idx];\r\n\r\n        this.listener.onEnd(res => {\r\n            _pages_js__WEBPACK_IMPORTED_MODULE_1__.resultsCont.append(this.createResultEl(res));\r\n            (0,_pages_js__WEBPACK_IMPORTED_MODULE_1__.transition)(_pages_js__WEBPACK_IMPORTED_MODULE_1__.pages.typing, _pages_js__WEBPACK_IMPORTED_MODULE_1__.pages.results);\r\n        });\r\n    }\r\n\r\n    begin() {\r\n        const text = this.genText(this.test.list, this.test.noSpace);\r\n        this.listener.newTest(this.test.title, text);\r\n    }\r\n}\n\n//# sourceURL=webpack://typing-warmup/./src/modes/tests/test.js?");

/***/ }),

/***/ "./src/modes/utils.js":
/*!****************************!*\
  !*** ./src/modes/utils.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   random: () => (/* binding */ random),\n/* harmony export */   randomk: () => (/* binding */ randomk)\n/* harmony export */ });\nfunction random(arr) {\r\n    return arr[Math.floor(Math.random() * arr.length)];\r\n}\r\n\r\nfunction randomk(arr, amt, noSep = false) {\r\n    let out = \"\";\r\n    for (let i = 0; i < amt - 1; i++) {\r\n        out += random(arr) + (noSep ? \"\" : \" \");\r\n    }\r\n\r\n    out += random(arr);\r\n\r\n    return out;\r\n}\r\n\n\n//# sourceURL=webpack://typing-warmup/./src/modes/utils.js?");

/***/ }),

/***/ "./src/modes/warmups/data.js":
/*!***********************************!*\
  !*** ./src/modes/warmups/data.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   warmups: () => (/* binding */ warmups)\n/* harmony export */ });\nconst warmups = [\r\n    {\r\n        \"title\": \"English\",\r\n        \"desc\": \"Basic English Warmup.\",\r\n        \"tests\": [\r\n            // common letter pairs\r\n            {\r\n                \"title\": \"Two-Letter Pairs\",\r\n                \"list\": [\"th\", \"ar\", \"he\", \"te\", \"an\", \"se\", \"in\", \"me\", \"er\", \"sa\", \"nd\", \"ne\", \"re\", \"wa\", \"ed\", \"ve\", \"es\", \"le\", \"ou\", \"no\", \"to\", \"ta\", \"ha\", \"al\", \"en\", \"de\", \"ea\", \"ot\", \"st\", \"so\", \"nt\", \"dt\", \"on\", \"ll\", \"at\", \"tt\", \"hi\", \"el\", \"as\", \"ro\", \"it\", \"ad\", \"ng\", \"di\", \"is\", \"ew\", \"or\", \"ra\", \"et\", \"ri\", \"of\", \"sh\", \"ti\"],\r\n                \"noSpace\": false\r\n            },\r\n\r\n            // common two letter words\r\n            {\r\n                \"title\": \"Two-Letter Words\",\r\n                \"list\": [\"of\", \"to\", \"in\", \"it\", \"is\", \"be\", \"as\", \"at\", \"so\", \"we\", \"he\", \"by\", \"or\", \"on\", \"do\", \"if\", \"me\", \"my\", \"up\", \"an\", \"go\", \"no\", \"us\", \"am\", \"hi\", \"ex\", \"ok\"],\r\n                \"noSpace\": false\r\n            },\r\n\r\n            // common three letter words\r\n            {\r\n                \"title\": \"Three-Letter Words\",\r\n                \"list\": [\"and\", \"fix\", \"own\", \"are\", \"fly\", \"odd\", \"ape\", \"fry\", \"our\", \"ace\", \"for\", \"pet\", \"act\", \"got\", \"pat\", \"ask\", \"get\", \"peg\", \"arm\", \"god\", \"paw\", \"age\", \"gel\", \"pup\", \"ago\", \"gas\", \"pit\", \"air\", \"hat\", \"put\", \"ate\", \"hit\", \"pot\", \"all\", \"has\", \"pop\", \"but\", \"had\", \"pin\", \"bye\", \"how\", \"rat\", \"bad\", \"her\", \"rag\", \"big\", \"his\", \"rub\", \"bed\", \"hen\", \"row\", \"bat\", \"ink\", \"rug\", \"boy\", \"ice\", \"run\", \"bus\", \"ill\", \"rap\", \"bag\", \"jab\", \"ram\", \"box\", \"jug\", \"sow\", \"bit\", \"jet\", \"see\", \"bee\", \"jam\", \"saw\", \"buy\", \"jar\", \"set\", \"bun\", \"job\", \"sit\", \"cub\", \"jog\", \"sir\", \"cat\", \"kit\", \"sat\", \"car\", \"key\", \"sob\", \"cut\", \"lot\", \"tap\", \"cow\", \"lit\", \"tip\", \"cry\", \"let\", \"top\", \"cab\", \"lay\", \"tug\", \"can\", \"mat\", \"tow\", \"dad\", \"man\", \"toe\", \"dab\", \"mad\", \"tan\", \"dam\", \"mug\", \"ten\", \"did\", \"mix\", \"two\", \"dug\", \"map\", \"use\", \"den\", \"mum\", \"van\", \"dot\", \"mud\", \"vet\", \"dip\", \"mom\", \"was\", \"day\", \"may\", \"wet\", \"ear\", \"met\", \"win\", \"eye\", \"net\", \"won\", \"eat\", \"new\", \"wig\", \"end\", \"nap\", \"war\", \"elf\", \"now\", \"why\", \"egg\", \"nod\", \"who\", \"far\", \"way\", \"fat\", \"not\", \"wow\", \"few\", \"nut\", \"you\", \"fan\", \"oar\", \"yes\", \"fun\", \"one\", \"yak\", \"fit\", \"out\", \"yet\", \"fin\", \"owl\", \"zip\", \"fox\", \"old\", \"zap\", \"will\", \"she\", \"any\", \"the\"],\r\n                \"noSpace\": false\r\n            },\r\n\r\n            {\r\n                \"title\": \"Alphabet\",\r\n                \"list\": [\"a\", \"b\", \"c\", \"d\", \"e\", \"f\", \"g\", \"h\", \"i\", \"j\", \"k\", \"l\", \"m\", \"n\", \"o\", \"p\", \"q\", \"r\", \"s\", \"t\", \"u\", \"v\", \"w\", \"x\", \"y\", \"z\"],\r\n                \"noSpace\": true\r\n            },\r\n\r\n            {\r\n                \"title\": \"Numbers\",\r\n                \"list\": [\"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", \"9\", \"0\"],\r\n                \"noSpace\": true\r\n            },\r\n\r\n            {\r\n                \"title\": \"Special Characters\",\r\n                \"list\": [\"~\", \"`\", \"!\", \"@\", \"#\", \"$\", \"%\", \"^\", \"&\", \"*\", \"(\", \")\", \"_\", \"+\", \"-\", \"=\", \"{\", \"}\", \"[\", \"]\", \"<\", \">\", \"|\", \"\\\\\", \":\", \"\\\"\", \";\", \"'\", \",\", \".\", \"/\", \"?\"],\r\n                \"noSpace\": true\r\n            }\r\n        ]\r\n    },\r\n];\n\n//# sourceURL=webpack://typing-warmup/./src/modes/warmups/data.js?");

/***/ }),

/***/ "./src/modes/warmups/warmup.js":
/*!*************************************!*\
  !*** ./src/modes/warmups/warmup.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WarmUpGenerator: () => (/* binding */ WarmUpGenerator)\n/* harmony export */ });\n/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.js */ \"./src/modes/warmups/data.js\");\n/* harmony import */ var _pages_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pages.js */ \"./src/pages.js\");\n/* harmony import */ var _mode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mode.js */ \"./src/modes/mode.js\");\n\r\n\r\n\r\n\r\nclass WarmUpGenerator extends _mode_js__WEBPACK_IMPORTED_MODULE_2__.TypeMode {\r\n    constructor(idx) {\r\n        super();\r\n        this.warmup = _data_js__WEBPACK_IMPORTED_MODULE_0__.warmups[idx];\r\n        this.warmupIndex = 0;\r\n        this.testResults = [];\r\n\r\n        this.listener.onEnd(res => {\r\n            this.testResults.push(res);\r\n            this.begin();\r\n            this.warmupIndex++;\r\n            if (this.warmupIndex >= this.warmup.tests.length) {\r\n                console.log(this.testResults);\r\n\r\n                const resultEls = [];\r\n                for (const result of this.testResults) {\r\n                    resultEls.push(this.createResultEl(result));\r\n                }\r\n\r\n                _pages_js__WEBPACK_IMPORTED_MODULE_1__.resultsCont.append(...resultEls);\r\n                (0,_pages_js__WEBPACK_IMPORTED_MODULE_1__.transition)(_pages_js__WEBPACK_IMPORTED_MODULE_1__.pages.typing, _pages_js__WEBPACK_IMPORTED_MODULE_1__.pages.results);\r\n            }\r\n        });\r\n    }\r\n\r\n    begin() {\r\n        const warmup = this.warmup.tests[this.warmupIndex];\r\n        const text = this.genText(warmup.list, warmup.noSpace);\r\n        this.listener.newTest(warmup.title, text);\r\n    }\r\n}\n\n//# sourceURL=webpack://typing-warmup/./src/modes/warmups/warmup.js?");

/***/ }),

/***/ "./src/pages.js":
/*!**********************!*\
  !*** ./src/pages.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   pages: () => (/* binding */ pages),\n/* harmony export */   resultsCont: () => (/* binding */ resultsCont),\n/* harmony export */   transition: () => (/* binding */ transition)\n/* harmony export */ });\n// export const wpmResultsCont = document.querySelector(\".wpmresults-cont\");\r\n// export const wpmResults = document.querySelector(\".wpmresults\");\r\n// export const typingPageCont = document.querySelector(\".typing-cont\");\r\n\r\nconst pages = {\r\n    results: document.querySelector(\".wpmresults-page\"),\r\n    typing: document.querySelector(\".typing-page\")\r\n};\r\n\r\nfunction transition(curr, prev) {\r\n    curr.style.display = \"none\";\r\n    prev.style.display = \"block\";\r\n}\r\n\r\nconst resultsCont = document.querySelector(\".wpmresults\");\n\n//# sourceURL=webpack://typing-warmup/./src/pages.js?");

/***/ }),

/***/ "./src/typing/test-result.js":
/*!***********************************!*\
  !*** ./src/typing/test-result.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TestResult: () => (/* binding */ TestResult)\n/* harmony export */ });\nclass TestResult {\r\n    constructor(name) {\r\n        this.name = name;\r\n        this.chars = 0;\r\n        this.correct = 0;\r\n        this.wrong = 0;\r\n    }\r\n\r\n    begin() {\r\n        this.start = new Date();\r\n    }\r\n\r\n    end() {\r\n        this.end = new Date();\r\n    }\r\n\r\n    calcWpm() {\r\n        const words = this.chars / 5;\r\n        const errors = this.chars - this.correct;\r\n        \r\n        const time = (this.end.getTime() - this.start.getTime()) / (1000 * 60);\r\n        return Math.max(0, (words - errors / 5) / time);\r\n    }\r\n\r\n    calcAcc() {\r\n        const words = this.chars;\r\n        const errors = this.wrong;\r\n        return (1 - errors / words) * 100;\r\n    }\r\n}\n\n//# sourceURL=webpack://typing-warmup/./src/typing/test-result.js?");

/***/ }),

/***/ "./src/typing/tynput.js":
/*!******************************!*\
  !*** ./src/typing/tynput.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TynputListener: () => (/* binding */ TynputListener),\n/* harmony export */   tynput: () => (/* binding */ tynput)\n/* harmony export */ });\n/* harmony import */ var _test_result_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test-result.js */ \"./src/typing/test-result.js\");\n\r\n\r\n/*\r\nTyping Input Manager\r\nThis manages the text box and what the user sees.\r\nA singleton - ish type class\r\n\r\nExposes the 'listener' class which is the primary way to communicate between the two.\r\n*/\r\nclass TynputManager {\r\n    constructor() {\r\n        /**\r\n         * @type {HTMLInputElement}\r\n         */\r\n        this.inputEl = document.querySelector(\".user-input\");\r\n\r\n        /**\r\n         * @type {HTMLDivElement}\r\n         */\r\n        this.testCont = document.querySelector(\".test-cont\");\r\n\r\n        /**\r\n         * @type {HTMLDivElement}\r\n         */\r\n        this.focusOverlay = document.querySelector(\".overlay\");\r\n\r\n        this.testTitle = document.querySelector(\".test-title\");\r\n\r\n        this.tynputFocused = true;\r\n\r\n        this.focusTynput();\r\n        document.addEventListener(\"keydown\", this.focusTynput.bind(this));\r\n\r\n        this.testCont.addEventListener(\"click\", this.focusTynput.bind(this));\r\n        this.focusOverlay.addEventListener(\"click\", this.focusTynput.bind(this));\r\n\r\n        this.inputEl.addEventListener(\"focus\", () => {\r\n            this.focusOverlay.style.display = \"none\";\r\n        });\r\n\r\n        this.inputEl.addEventListener(\"blur\", () => {\r\n            this.focusOverlay.style.display = \"flex\";\r\n        });\r\n\r\n        this.inputEl.addEventListener(\"keydown\", e => {\r\n            if (e.key == \"Backspace\") {\r\n                if (this.cIdx == 0) return;\r\n                this.els[this.cIdx].classList.remove(\"curr\", \"wrong\", \"correct\");\r\n                this.cIdx--;\r\n                this.els[this.cIdx].classList.remove(\"wrong\", \"correct\");\r\n                this.els[this.cIdx].classList.add(\"curr\");\r\n            }\r\n\r\n            // not a typed key, or command (could happen!)\r\n            if (e.key.length != 1 || e.altKey || e.ctrlKey || e.metaKey) {\r\n                return;\r\n            }\r\n\r\n            if (this.cIdx == 0 && !e.shiftKey) {\r\n                this.testResult.begin();\r\n            }\r\n\r\n            this.els[this.cIdx].classList.remove(\"curr\");\r\n\r\n            if (this.text[this.cIdx] == e.key) {\r\n                this.els[this.cIdx].classList.add(\"correct\");\r\n                this.testResult.correct++;\r\n            } else {\r\n                this.els[this.cIdx].classList.add(\"wrong\");\r\n                this.testResult.wrong++;\r\n            }\r\n\r\n            this.testResult.chars++;\r\n            this.cIdx++;\r\n            if (this.cIdx >= this.els.length) {\r\n                this.testResult.end();\r\n                this.listener._endTest(this.testResult);\r\n                return;\r\n            }\r\n\r\n            this.els[this.cIdx].classList.add(\"curr\");\r\n        });\r\n    }\r\n\r\n    focusTynput() {\r\n        this.inputEl.focus();\r\n        this.focusOverlay.style.display = \"none\";\r\n    }\r\n\r\n    /**\r\n     * Create a new test\r\n     * @param {string} title title\r\n     * @param {string} text text\r\n     * @param {TynputListener} listener listener\r\n     */\r\n    newTest(title, text, listener) {\r\n        this.clear();\r\n        this.testTitle.textContent = title;\r\n        this.cIdx = 0;\r\n        this.text = text;\r\n        this.listener = listener;\r\n        this.testResult = new _test_result_js__WEBPACK_IMPORTED_MODULE_0__.TestResult(title);\r\n\r\n        const chars = text.split(\"\");\r\n        this.els = [];\r\n        for (const char of chars) {\r\n            const el = document.createElement(\"pre\");\r\n            el.textContent = char;\r\n            el.classList.add(\"char\");\r\n\r\n            if (char == \" \") {\r\n                el.classList.add(\"space\");\r\n            }\r\n\r\n            this.els.push(el);\r\n        }\r\n\r\n        this.els[0].classList.add(\"curr\");\r\n        this.testCont.append(...this.els);\r\n    }\r\n    \r\n    clear() {\r\n        this.cIdx = 0;\r\n        this.testResult = null;\r\n        this.testCont.textContent = \"\";\r\n    }\r\n}\r\n\r\nconst tynput = new TynputManager();\r\n\r\nclass TynputListener {\r\n    newTest(title, text) {\r\n        tynput.newTest(title, text, this);\r\n    }\r\n\r\n    _endTest(testResult) {\r\n        this.endFn(testResult);\r\n    }\r\n\r\n    /**\r\n     * When a test has been completed\r\n     * @param {(result: TestResult) => void} endFn handler\r\n     */\r\n    onEnd(endFn) {\r\n        this.endFn = endFn;\r\n    }\r\n}\n\n//# sourceURL=webpack://typing-warmup/./src/typing/tynput.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;
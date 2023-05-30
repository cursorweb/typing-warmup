import { tests } from "./data.js";
import { pages, transition, resultsCont } from "../../pages.js";
import { TestResult } from "../../typing/test-result.js";
import { randomk } from "../utils.js";
import { TypeMode } from "../mode.js";

export class TestGenerator extends TypeMode {
    constructor(idx) {
        super();
        this.test = tests[idx];

        this.listener.onEnd(res => {
            resultsCont.append(this.createResultEl(res));
            transition(pages.typing, pages.results);
        });
    }

    begin() {

    }

    genText() {
        return randomk(this.test.list, 1, warmup.noSpace);
    }
}
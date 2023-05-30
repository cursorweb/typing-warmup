import { tests } from "./data.js";
import { pages, transition, resultsCont } from "../../pages.js";
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
        const text = this.genText(this.test.list, this.test.noSpace);
        this.listener.newTest(this.test.title, text);
    }
}
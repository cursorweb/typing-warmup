import { ITest, tests } from "./data";
import { resultsCont } from "../../pages";
import { TypeMode } from "../mode";

export class TestGenerator extends TypeMode {
    test: ITest;
    constructor(idx: number) {
        super();
        this.test = tests[idx];

        this.listener.onEnd(res => {
            resultsCont.append(this.createResultEl(res));
        });
    }

    begin() {
        const text = this.genText(this.test.list, this.test.noSpace);
        this.listener.newTest(this.test.title, text);
    }
}
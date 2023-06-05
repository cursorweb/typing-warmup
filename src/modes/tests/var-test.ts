import { pages, transition, resultsCont } from "../../pages";
import { DEBUG_AMT, TypeMode } from "../mode";
import { varData, IVarTest } from "./var-data";

export class VarTestGenerator extends TypeMode {
    test: IVarTest;
    constructor(idx: number) {
        super();
        this.test = varData[idx];

        this.listener.onEnd(res => {
            resultsCont.append(this.createResultEl(res));
            transition(pages.results);
        });
    }

    begin() {
        const text = this.test.gen(DEBUG_AMT);
        this.listener.newTest(this.test.title, text);
    }
}
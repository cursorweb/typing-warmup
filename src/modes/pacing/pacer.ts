import { pages, resultsCont, transition } from "../../pages";
import { TypeMode } from "../mode";
import { IPacer, pacers } from "./data";

export class PacerGenerator extends TypeMode {
    pacer: IPacer;
    constructor(idx: number) {
        super();
        this.pacer = pacers[idx];

        this.listener.onEnd(res => {
            resultsCont.append(this.createResultEl(res));
            transition(pages.results);
        });
    }

    begin() {
        const text = this.genText(this.pacer.list, false);
        this.listener.newTest(this.pacer.title, text);
    }
}
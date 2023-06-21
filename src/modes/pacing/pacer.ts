import { pages, resultsCont, transition } from "../../pages";
import { tynput } from "../../typing/tynput";
import { TypeMode } from "../mode";
import { IPacer, pacers } from "./data";

export class PacerGenerator extends TypeMode {
    pacer: IPacer;
    startWpm: number;

    constructor(idx: number, startWpm: number) {
        super();
        this.pacer = pacers[idx];
        this.startWpm = startWpm;

        this.listener.onEnd(res => {
            this.startWpm += 10;
            console.log(this.startWpm);
            this.begin();
        });
    }

    begin() {
        const text = this.genText(this.pacer.list, false);
        this.listener.newTest(this.pacer.title, text);
        tynput.createPacer(this.startWpm);
    }
}
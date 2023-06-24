import { resultsCont } from "../../pages";
import { tynput } from "../../typing/tynput";
import { TypeMode } from "../mode";
import { IPacer, pacers } from "./data";

export interface PacerOptions {
    startWpm: number;
    nextWpm: number;
    minAccuracy?: number;
}

export class PacerGenerator extends TypeMode {
    pacer: IPacer;
    startWpm: number;
    options: PacerOptions;

    constructor(idx: number, options: PacerOptions) {
        super();
        this.pacer = pacers[idx];
        this.options = options;
        this.startWpm = options.startWpm;

        this.listener.onEnd(res => {
            const wpm = res.calcWpm();
            const acc = res.calcAcc();
            if (wpm >= this.startWpm && acc >= this.options.minAccuracy) {
                this.startWpm += this.options.nextWpm;
            }

            const infoDiv = document.createElement("div");
            infoDiv.textContent = "Next WPM: " + this.startWpm;

            resultsCont.append(infoDiv, this.createResultEl(res));
        });
    }

    begin() {
        const text = this.genText(this.pacer.list, false);
        this.listener.newTest(this.pacer.title, text);
        tynput.createPacer(this.startWpm);
    }
}
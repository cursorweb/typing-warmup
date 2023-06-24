import { random } from "../utils";
import { list } from "./var-list";

export interface IVarTest {
    title: string,
    desc: string,
    gen: (amt: number) => string,
    qwerty?: "yes" | "no"
}

export const varData: IVarTest[] = [{
    title: "Keyboard Jump Left Hand",
    desc: "Jump to another key and then jump back to U! (Dvorak Layout)",
    gen(amt) {
        let out = "";
        for (let i = 0; i < amt / 2; i++) {
            out += "u";
            out += random(list.leftU);
        }
        return out;
    },
    qwerty: "no"
}, {
    title: "Keyboard Jump Right Hand",
    desc: "Jump to another key and then jump back to H! (Dvorak Layout)",
    gen(amt) {
        let out = "";
        for (let i = 0; i < amt / 2; i++) {
            out += "h";
            out += random(list.rightU);
        }
        return out;
    },
    qwerty: "no"
}, {
    title: "Shift Key Practice",
    desc: "Type the letter or the capital verson!",
    gen(amt) {
        let out = "";
        for (let i = 0; i < amt / 2; i++) {
            out += random(list.alpha);
            out += random(list.alpha).toUpperCase();
        }
        return out;
    }
}, {
    title: "Special Character Practice",
    desc: "Type the lower case version, and then the upper case, or the other way around!",
    gen(amt) {
        let out = "";
        for (let i = 0; i < amt / 2; i++) {
            const index = Math.floor(Math.random() * list.lowerSpec.length);
            if (Math.random() < 0.5) {
                out += list.lowerSpec[index] + list.upperSpec[index];
            } else {
                out += list.upperSpec[index] + list.lowerSpec[index];
            }
        }
        return out;
    }
}];
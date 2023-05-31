import { random } from "../utils";

const leftU = ["a", "o", "e", "'", ",", ".", "p", "y", "i", ";", "q", "j", "k", "x", "1", "2", "3", "4", "5", "6", "`"];
const rightH = ["d", "t", "n", "s", "-", "f", "g", "c", "r", "l", "/", "=", "\\", "x", "b", "m", "w", "v", "z", "7", "8", "9", "0", "[", "]"];

export interface IVarTest {
    title: string,
    desc: string,
    gen: (amt: number) => string
}

export const varData: IVarTest[] = [{
    title: "Keyboard Jump U",
    desc: "Jump to another key and then jump back to U! (Dvorak Layout)",
    gen(amt) {
        let out = "";
        let nData = leftU;
        for (let i = 0; i < amt / 2; i++) {
            out += "u";
            out += random(nData);
        }
        return out;
    }
}, {
    title: "Keyboard Jump H",
    desc: "Jump to another key and then jump back to H! (Dvorak Layout)",
    gen(amt) {
        let out = "";
        let nData = rightH;
        for (let i = 0; i < amt / 2; i++) {
            out += "h";
            out += random(nData);
        }
        return out;
    }
}];
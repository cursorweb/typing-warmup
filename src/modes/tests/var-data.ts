import { drop, random } from "../utils";

export const data = ["'", ",", ".", "p", "y", "f", "g", "c", "r", "l", "a", "o", "e", "u", "i", "d", "h", "t", "n", "s", "-", ";", "q", "j", "k", "x", "b", "m", "w", "v", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

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
        let nData = drop(data, "u");
        for (let i = 0; i < amt / 2; i++) {
            out += "u";
            out += random(nData);
        }
        return out;
    }
}];
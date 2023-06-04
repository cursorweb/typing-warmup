import { random } from "../utils";

export interface IVarTest {
    title: string,
    desc: string,
    data: string[],
    gen: (this: IVarTest, amt: number) => string,
    qwerty?: "yes" | "no"
}

export const varData: IVarTest[] = [{
    title: "Keyboard Jump Left Hand",
    desc: "Jump to another key and then jump back to U! (Dvorak Layout)",
    data: ["a", "o", "e", "'", ",", ".", "p", "y", "i", ";", "q", "j", "k", "x", "1", "2", "3", "4", "5", "6", "`"],
    gen(amt) {
        let out = "";
        for (let i = 0; i < amt / 2; i++) {
            out += "u";
            out += random(this.data);
        }
        return out;
    },
    qwerty: "no"
}, {
    title: "Keyboard Jump Right Hand",
    desc: "Jump to another key and then jump back to H! (Dvorak Layout)",
    data: ["d", "t", "n", "s", "-", "f", "g", "c", "r", "l", "/", "=", "\\", "x", "b", "m", "w", "v", "z", "7", "8", "9", "0", "[", "]"],
    gen(amt) {
        let out = "";
        for (let i = 0; i < amt / 2; i++) {
            out += "h";
            out += random(this.data);
        }
        return out;
    },
    qwerty: "no"
}, {
    title: "Shift Key Practice",
    data: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    desc: "Type the letter or the capital verson!",
    gen(amt) {
        let out = "";
        for (let i = 0; i < amt / 2; i++) {
            out += random(this.data);
            out += random(this.data).toUpperCase();
        }
        return out;
    }
}];
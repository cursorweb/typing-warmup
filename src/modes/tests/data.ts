export interface ITest {
    title: string;
    desc: string;
    list: string[];
    noSpace: boolean;
}
export const tests = [
    {
        "title": "Left Hand DV",
        "desc": "Left Hand Only! (Dvorak Layout)",
        "list": ["a", "o", "e", "u", "'", ",", ".", "p", "y", "i", ";", "q", "j", "k", "1", "2", "3", "4", "5", "6", "`"],
        "noSpace": true
    },
    {
        "title": "Right Hand DV",
        "desc": "Right Hand Only! (Dvorak Layout)",
        "list": ["d", "h", "t", "n", "s", "-", "f", "g", "c", "r", "l", "/", "=", "\\", "x", "b", "m", "w", "v", "z", "7", "8", "9", "0", "[", "]"],
        "noSpace": true
    },
    {
        "title": "Spanish Accents",
        "desc": "All spanish accents, including ü and ç",
        "list": ["á", "é", "í", "ó", "ú", "Á", "É", "Ó", "Í", "Ú", "ñ", "Ñ", "ç", "Ç", "ü", "Ü"],
        "noSpace": true
    },
];
export interface IWarmup {
    title: string,
    desc: string,
    tests: {
        title: string,
        list: string[],
        noSpace: boolean
    }[]
}

export const warmups: IWarmup[] = [
    {
        "title": "English",
        "desc": "Basic English Warmup.",
        "tests": [
            // common letter pairs
            {
                "title": "Two-Letter Pairs",
                "list": ["th", "ar", "he", "te", "an", "se", "in", "me", "er", "sa", "nd", "ne", "re", "wa", "ed", "ve", "es", "le", "ou", "no", "to", "ta", "ha", "al", "en", "de", "ea", "ot", "st", "so", "nt", "dt", "on", "ll", "at", "tt", "hi", "el", "as", "ro", "it", "ad", "ng", "di", "is", "ew", "or", "ra", "et", "ri", "of", "sh", "ti"],
                "noSpace": false
            },

            // common two letter words
            {
                "title": "Two-Letter Words",
                "list": ["of", "to", "in", "it", "is", "be", "as", "at", "so", "we", "he", "by", "or", "on", "do", "if", "me", "my", "up", "an", "go", "no", "us", "am", "hi", "ex", "ok"],
                "noSpace": false
            },

            // common three letter words
            {
                "title": "Three-Letter Words",
                "list": ["and", "fix", "own", "are", "fly", "odd", "ape", "fry", "our", "ace", "for", "pet", "act", "got", "pat", "ask", "get", "peg", "arm", "god", "paw", "age", "gel", "pup", "ago", "gas", "pit", "air", "hat", "put", "ate", "hit", "pot", "all", "has", "pop", "but", "had", "pin", "bye", "how", "rat", "bad", "her", "rag", "big", "his", "rub", "bed", "hen", "row", "bat", "ink", "rug", "boy", "ice", "run", "bus", "ill", "rap", "bag", "jab", "ram", "box", "jug", "sow", "bit", "jet", "see", "bee", "jam", "saw", "buy", "jar", "set", "bun", "job", "sit", "cub", "jog", "sir", "cat", "kit", "sat", "car", "key", "sob", "cut", "lot", "tap", "cow", "lit", "tip", "cry", "let", "top", "cab", "lay", "tug", "can", "mat", "tow", "dad", "man", "toe", "dab", "mad", "tan", "dam", "mug", "ten", "did", "mix", "two", "dug", "map", "use", "den", "mum", "van", "dot", "mud", "vet", "dip", "mom", "was", "day", "may", "wet", "ear", "met", "win", "eye", "net", "won", "eat", "new", "wig", "end", "nap", "war", "elf", "now", "why", "egg", "nod", "who", "far", "way", "fat", "not", "wow", "few", "nut", "you", "fan", "oar", "yes", "fun", "one", "yak", "fit", "out", "yet", "fin", "owl", "zip", "fox", "old", "zap", "will", "she", "any", "the"],
                "noSpace": false
            },

            {
                "title": "Alphabet",
                "list": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
                "noSpace": true
            },

            {
                "title": "Numbers",
                "list": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
                "noSpace": true
            },

            {
                "title": "Special Characters",
                "list": ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "=", "{", "}", "[", "]", "<", ">", "|", "\\", ":", "\"", ";", "'", ",", ".", "/", "?"],
                "noSpace": true
            }
        ]
    },
];
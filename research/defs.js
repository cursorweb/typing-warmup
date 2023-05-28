const testData = {
    // common letter pairs
    "pairs": ["th", "ar", "he", "te", "an", "se", "in", "me", "er", "sa", "nd", "ne", "re", "wa", "ed", "ve", "es", "le", "ou", "no", "to", "ta", "ha", "al", "en", "de", "ea", "ot", "st", "so", "nt", "dt", "on", "ll", "at", "tt", "hi", "el", "as", "ro", "it", "ad", "ng", "di", "is", "ew", "or", "ra", "et", "ri", "of", "sh", "ti"],

    // common two letter words
    "twoLetter": ["of", "to", "in", "it", "is", "be", "as", "at", "so", "we", "he", "by", "or", "on", "do", "if", "me", "my", "up", "an", "go", "no", "us", "am", "hi", "ex", "ok"],

    // common three letter words
    "threeLetter": ["and", "fix", "own", "are", "fly", "odd", "ape", "fry", "our", "ace", "for", "pet", "act", "got", "pat", "ask", "get", "peg", "arm", "god", "paw", "age", "gel", "pup", "ago", "gas", "pit", "air", "hat", "put", "ate", "hit", "pot", "all", "has", "pop", "but", "had", "pin", "bye", "how", "rat", "bad", "her", "rag", "big", "his", "rub", "bed", "hen", "row", "bat", "ink", "rug", "boy", "ice", "run", "bus", "ill", "rap", "bag", "jab", "ram", "box", "jug", "sow", "bit", "jet", "see", "bee", "jam", "saw", "buy", "jar", "set", "bun", "job", "sit", "cub", "jog", "sir", "cat", "kit", "sat", "car", "key", "sob", "cut", "lot", "tap", "cow", "lit", "tip", "cry", "let", "top", "cab", "lay", "tug", "can", "mat", "tow", "dad", "man", "toe", "dab", "mad", "tan", "dam", "mug", "ten", "did", "mix", "two", "dug", "map", "use", "den", "mum", "van", "dot", "mud", "vet", "dip", "mom", "was", "day", "may", "wet", "ear", "met", "win", "eye", "net", "won", "eat", "new", "wig", "end", "nap", "war", "elf", "now", "why", "egg", "nod", "who", "far", "way", "fat", "not", "wow", "few", "nut", "you", "fan", "oar", "yes", "fun", "one", "yak", "fit", "out", "yet", "fin", "owl", "zip", "fox", "old", "zap", "will", "she", "any", "the"],

    "alphabet": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],

    "numbers": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],

    "extended": ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "=", "{", "}", "[", "]", "<", ">", "|", "\\", ":", "\"", ";", "'", ",", ".", "/", "?"],
};

const testTitles = {
    "pairs": "Two-Letter Pairs",
    "twoLetter": "Two-Letter Words",
    "threeLetter": "Three-Letter Words",
    "alphabet": "Alphabet Letters",
    "numbers": "Numbers",
    "extended": "Special Characters"
};

const testOrder = Object.keys(testData);
const wordAmt = 50;

const tests = {
    "pairs": amt => randomk(testData.pairs, amt),
    "twoLetter": amt => randomk(testData.twoLetter, amt),
    "threeLetter": amt => randomk(testData.threeLetter, amt),
    "alphabet": amt => randomk(testData.alphabet, amt, false),
    "numbers": amt => randomk(testData.numbers, amt, false),
    "extended": amt => randomk(testData.extended, amt, false),
};
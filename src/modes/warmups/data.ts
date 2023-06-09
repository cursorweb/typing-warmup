import { IData } from "../idata";

export interface IWarmup extends IData {
    tests: {
        title: string,
        list: string[],
        noSpace: boolean
    }[]
}

export const warmups: IWarmup[] = [
    {
        "title": "English",
        "desc": "Basic English Warmup",
        "tests": [
            {
                "title": "Two-Letter Pairs",
                "list": ["th", "ar", "he", "te", "an", "se", "in", "me", "er", "sa", "nd", "ne", "re", "wa", "ed", "ve", "es", "le", "ou", "no", "to", "ta", "ha", "al", "en", "de", "ea", "ot", "st", "so", "nt", "dt", "on", "ll", "at", "tt", "hi", "el", "as", "ro", "it", "ad", "ng", "di", "is", "ew", "or", "ra", "et", "ri", "of", "sh", "ti"],
                "noSpace": false
            },
            {
                "title": "Two-Letter Words",
                "list": ["of", "to", "in", "it", "is", "be", "as", "at", "so", "we", "he", "by", "or", "on", "do", "if", "me", "my", "up", "an", "go", "no", "us", "am"],
                "noSpace": false
            },
            {
                "title": "Three-Letter Words",
                "list": ["the", "and", "for", "are", "but", "not", "you", "all", "any", "can", "had", "her", "was", "one", "our", "out", "day", "get", "has", "him", "his", "how", "man", "new", "now", "old", "see", "two", "way", "who", "boy", "did", "its", "let", "put", "say", "she", "too", "use"],
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
    {
        "title": "Spanish",
        "desc": "Spanish Monkeytype Warmup",
        "tests": [
            {
                "title": "Two-letter pairs",
                "list": ["er", "en", "ar", "ra", "ue", "on", "es", "de", "ie", "re", "os", "ma", "no", "ca", "nt", "do", "tr", "to", "po", "ad", "so", "un", "te", "st", "ro", "ta", "ir", "co", "qu", "an", "ho", "as", "al", "la", "da", "or", "br", "ce", "ch", "nd", "vi", "sa"],
                "noSpace": false
            },
            {
                "title": "Three-letter pairs",
                "list": ["ien", "ent", "con", "cho", "que", "son", "est", "nto", "uer", "bre", "tra", "ado", "era", "ste", "nte", "per", "ero", "gun", "nos", "tro", "ran", "ace", "cer", "tie", "unt", "ier", "egu", "omb", "mbr", "ndo", "baj", "ajo", "ema", "sta", "ona"],
                "noSpace": false
            },
            {
                "title": "Alfabeto",
                "list": ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "z", "x", "c", "v", "b", "n", "m", "á", "é", "í", "ó", "ú", "ü"],
                "noSpace": true
            },
            {
                "title": "Special Characters",
                "list": ["¡", "¿", "?", "!", "\"", "$", "%", "&", "/", "(", ")", "=", "*", ":", ";", "-", "_"],
                "noSpace": true
            }
        ]
    }
];
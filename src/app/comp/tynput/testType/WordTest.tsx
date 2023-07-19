import { Char, Word, useTestProps, useTimer } from "./Test";
import { Tynput } from "../Tynput";
import React, { useState } from "react";

interface WordTestResult {
    wpm: number;
    acc: number;
    wrong: string[];
    // wpms: number[];
    // slow: string[];
}

interface WordTestProps {
    words: string[][];
    onDone: (result: WordTestResult) => void;
}

export function WordTest({ words, onDone }: WordTestProps) {
    const [wIdx, setwIdx] = useState(0);
    const [cIdx, setcIdx] = useState(0);

    const { beginTimer, endTimer } = useTimer();

    function onChar(char: string) {
        if (char == " ") {
            setwIdx(wIdx + 1);
            setcIdx(0);
        } else {
            setcIdx(cIdx + 1);
        }
    }

    function onDel() {

    }

    return (
        <>
            <div>
                {words.map((word, wi) =>
                    <Word key={wi} space={wi < words.length - 1} onSpace={cIdx >= word.length && wIdx == wi}>
                        {word.map((c, ci) => <Char char={c} state={wi == wIdx && ci == cIdx ? "curr" : ""} key={ci} />)}
                    </Word>
                )}
            </div>

            <Tynput
                onChar={onChar}
                onDel={onDel}
                hasWords
            />
        </>
    );
}

export function wordMapToChars(wordMap: string[][]) {
    return {
        wordMap,
        chars: wordMap.flatMap((w, i) => i > 0 ? [" ", ...w] : w)
    };
}
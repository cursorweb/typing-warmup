import { useState } from "react";
import { Char, WordTestResult, calcAcc, calcWPM, useTest, useTimer } from "./Test";
import { Tynput } from "../Tynput";

interface WordTestProps {
    words: {
        wordMap: string[][];
        chars: string[];
    }
    onDone: (result: WordTestResult) => void;
}

export function WordTest({ words: { wordMap, chars }, onDone }: WordTestProps) {
    const {
        idx, setIdx,
        wrong, setWrong,
        beginTimer, endTimer
    } = useTest();

    function onChar(char: string) {
        const actual = chars[idx];

        if (char != actual) {
            setWrong(wrong.add(idx));
        }

        if (idx == 0) {
            beginTimer();
        }

        if (idx < chars.length - 1) {
            setIdx(idx + 1);
        } else {
            const elapsed = endTimer();
            const len = chars.length;
            const wrongChars = wrong.size;

            // onDone({
            //     wpm: calcWPM(len, wrongChars, elapsed),
            //     acc: calcAcc(len, wrongChars),
            //     wrong: [...wrong]
            // });
        }

        setIdx(idx + 1);
    }

    function onDel(count: number) {
        if (idx > 0) {
            // don't allow deleting of more words
            // because we don't use a word-based system
            // we can't actually delete beyond the current word
            if (count == 1 && chars[idx - 1] == " ") return;

            const endIdx = idx - count;

            for (let i = idx - 1; i >= endIdx; i--) {
                if (wrong.has(i)) {
                    setWrong(w => {
                        w.delete(i);
                        return w;
                    });
                }
            }

            setIdx(idx - count);
        }
    }

    return (
        <>
            <div>
                {chars.map((c, i) => {
                    if (i < idx) {
                        return <Char char={c} state={wrong.has(i) ? "wrong" : "correct"} key={i} />;
                    } else {
                        return <Char char={c} state={idx == i ? "curr" : ""} key={i} />;
                    }
                })}
            </div>
            <Tynput
                hasWords={true}
                onChar={onChar}
                onDel={onDel}
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
import { Tynput } from "comp/tynput/Tynput";
import { useTest, SmoothCursor, Char, calcWPM } from "./util";
import { useEffect, useRef } from "react";

export interface WordTestResult {
    wpm: string;
    acc: string;
    wrongWords: string[];
    wpms: {
        wpm: number,
        word: string
    }[];
}

interface WordTestProps {
    chars: string[];
    onDone: (result: WordTestResult) => void;
}

interface WordStats {
    // { [start]: { ... } }
    data: Record<string, {
        end: number,
        wrong: number,
        word: string,
        startDate?: number,
        endDate?: number
    }>,
    wordIdxStart: number,
    wrong: Set<string>,
    words: string[]
}

export function WordTest({ chars, onDone }: WordTestProps) {
    const wordStats = useRef<WordStats>({
        data: {},
        wordIdxStart: 0,
        wrong: new Set(),
        words: []
    });

    useEffect(() => {
        let startI = 0;
        let wIdx = 0;
        for (let i = 0; i < chars.length; i++) {
            if (chars[i] == " ") {
                wordStats.current.data[startI] = {
                    end: i - 1,
                    wrong: 0,
                    word: chars.slice(startI, i).join("")
                };
                wIdx++;
                startI = i + 1;
            }
        }

        wordStats.current.data[startI] = {
            end: chars.length - 1,
            wrong: 0,
            word: chars.slice(startI).join("")
        };
    }, []);

    const { idx, wrong, onChar, onDel } = useTest(chars, { handleDone, handleIdx });

    function handleDone(elapsed: number, wrongLen: number, acc: string) {
        const wpm = calcWPM(chars.length, wrongLen, elapsed);
        const stats = wordStats.current;

        onDone({
            wpm: wpm.toFixed(2),
            acc,
            wrongWords: [...stats.wrong],
            wpms: Object.keys(stats.data).map(key => {
                const data = stats.data[key];
                return {
                    wpm: calcWPM(data.word.length, data.wrong, data.endDate! - data.startDate!),
                    word: data.word
                };
            }),
        });
    }

    function handleIdx(idx: number, correct: boolean) {
        const stats = wordStats.current;
        let sIdx = stats.wordIdxStart;

        if (idx == stats.data[sIdx].end) {
            stats.data[sIdx].endDate = Date.now();
        }

        if (stats.data[idx]) { // into a new bound
            sIdx = idx;
            stats.wordIdxStart = sIdx;
        }

        const currStat = stats.data[sIdx];

        if (idx == sIdx) {
            currStat.startDate = Date.now();
        }

        if (!correct) {
            stats.wrong.add(currStat.word);
            currStat.wrong++;
        }
    }

    return (
        <>
            <SmoothCursor idx={idx}>
                {chars.map((c, i) => {
                    if (i < idx) {
                        return <Char char={c} state={wrong[i] ? "wrong" : "correct"} key={i} />;
                    } else {
                        return <Char char={c} state={idx == i ? "curr" : null} key={i} />;
                    }
                })}
            </SmoothCursor>

            <Tynput
                onChar={onChar}
                onDel={onDel}
            />
        </>
    );
}

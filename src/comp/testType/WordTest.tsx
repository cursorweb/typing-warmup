import { Tynput } from "comp/tynput/Tynput";
import { useTest, SmoothCursor, Char, calcWPM } from "./util";
import { useEffect, useMemo, useRef } from "react";

interface WordTestResult {
    wpm: number;
    acc: number;
    wrongWords: string[];
    wpms: number[];
}

interface WordTestProps {
    chars: string[];
    onDone: (result: WordTestResult) => void;
}

// { [start]: { ... } }
interface WordStats {
    data: Record<number, {
        wrong: number,
        wIdx: number,
        startDate?: number,
        endDate?: number
    }>,
    wordIdxStart: number,
    wrong: Set<number>
}

export function WordTest({ chars, onDone }: WordTestProps) {
    const wordStats = useRef<WordStats>({
        data: {},
        wordIdxStart: 0,
        wrong: new Set()
    });

    useEffect(() => {
        let startI = 0;
        let wIdx = 0;
        for (let i = 0; i < chars.length; i++) {
            if (chars[i] == " ") {
                wordStats.current.data[startI] = {
                    wrong: 0,
                    wIdx
                };
                wIdx++;
                startI = i + 1;
            }
        }

        wordStats.current.data[startI] = {
            wrong: 0,
            wIdx
        };
    }, []);

    const { idx, wrong, onChar, onDel } = useTest(chars, { handleDone, handleIdx });

    function handleDone(elapsed: number, wrongLen: number, acc: number) {
        const wpm = calcWPM(chars.length, wrongLen, elapsed);

        onDone({
            wpm,
            acc,
            wrongWords: [],
            wpms: [],
        });
    }

    function handleIdx(idx: number, correct: boolean) {
        const stats = wordStats.current;
        let sIdx = stats.wordIdxStart;

        if (stats.data[idx] || idx == chars.length - 1) { // into a new bound
            stats.data[sIdx].endDate = Date.now();

            if (stats.data[idx]) {
                sIdx = idx;
                stats.wordIdxStart = sIdx;
            }
        }

        const currStat = stats.data[sIdx];

        if (idx == sIdx) {
            currStat.startDate = Date.now();
        }

        if (!correct) {
            stats.wrong.add(currStat.wIdx);
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

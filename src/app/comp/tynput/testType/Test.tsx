import styles from "./Test.module.css";
import { useRef, useState } from "react";

export interface CharTestResult {
    cpm: number;
    acc: number;
    wrong: string[];
}

export interface WordTestResult {
    wpm: number;
    acc: number;
    wrong: string[];
    wpms: number[];
    slow: string[];
}

export function Char({ char, state }: { char: string, state: "correct" | "wrong" | "" | "curr" }) {
    return (
        <pre className={`${styles.char} ${char == " " ? styles.space : ""} ${state ? styles[state] : ""}`}>{char}</pre>
    );
}

export function calcCPM(chars: number, wrong: number, elapsed: number) {
    const time = elapsed / (1000 * 60);
    return Math.max(0, (chars - wrong) / time);
}

export function calcWPM(chars: number, wrong: number, elapsed: number) {
    const time = elapsed / (1000 * 60);
    return Math.max(0, ((chars - wrong) / 5) / time);
}

export function calcAcc(chars: number, wrong: number) {
    return (1 - wrong / chars) * 100;
}

export function useTestProps() {
    const [idx, setIdx] = useState(0);
    const [wrong, setWrong] = useState<Set<number>>(new Set());
    const timerRef = useRef<number>();

    return {
        idx, setIdx, wrong, setWrong,
        beginTimer: () => timerRef.current = Date.now(),
        endTimer: () => Date.now() - timerRef.current!
    }
}

export function useTest(chars: string[], onDone: (data: { elapsed: number, len: number, wrongChars: number, wrong: Set<number> }) => void) {
    const {
        idx, setIdx,
        wrong, setWrong,
        beginTimer, endTimer
    } = useTestProps();

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

            onDone({ elapsed, len, wrongChars, wrong });
        }
    }

    function onDel(ctrl: boolean) {
        if (idx == 0) return;
        if (ctrl) {
            let end = idx - 1;
            for (; chars[end] != " " && end >= 0; end--) {
                if (wrong.has(end)) {
                    wrong.delete(end);
                }
            }

            setWrong(wrong);
            setIdx(end + 1);
        } else {
            if (wrong.has(idx - 1)) {
                setWrong(w => {
                    w.delete(idx - 1);
                    return w;
                });
            }

            setIdx(idx - 1);
        }
    }

    return { onChar, onDel, wrong, idx };
}
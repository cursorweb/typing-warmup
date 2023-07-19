import styles from "./Test.module.css";
import React, { useRef, useState } from "react";

export function Char({ char, state }: { char: string, state: "correct" | "wrong" | "" | "curr" }) {
    return (
        <pre className={`${styles.char} ${char == " " ? styles.space : ""} ${state ? styles[state] : ""}`}>{char}</pre>
    );
}

export function Word({ children, space, onSpace }: { children: React.JSX.Element[], space: boolean, onSpace: boolean }) {
    return (
        <div className={styles.word}>
            {children}
            {space ? <Char char=" " state={onSpace ? "curr" : ""} /> : null}
        </div>
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

export function useTimer() {
    const timerRef = useRef<number>();
    return {
        beginTimer: () => timerRef.current = Date.now(),
        endTimer: () => Date.now() - timerRef.current!
    };
}

export function useTestProps() {
    const [idx, setIdx] = useState(0);
    // wrong = true (highlight it) wrong = false (just wrong)
    const [wrong, setWrong] = useState<Record<number, boolean>>({});
    const timerRef = useRef<number>();

    return {
        idx, setIdx, wrong, setWrong,
        beginTimer: () => timerRef.current = Date.now(),
        endTimer: () => Date.now() - timerRef.current!
    }
}

export function useTest(chars: string[], onDone: (data: { elapsed: number, len: number, wrongChars: number, wrong: Record<number, boolean> }) => void) {
    const {
        idx, setIdx,
        wrong, setWrong,
        beginTimer, endTimer
    } = useTestProps();

    function onChar(char: string) {
        const actual = chars[idx];

        if (char != actual) {
            wrong[idx] = true;
            setWrong(wrong);
        }

        if (idx == 0) {
            beginTimer();
        }

        if (idx < chars.length - 1) {
            setIdx(idx + 1);
        } else {
            const elapsed = endTimer();
            const len = chars.length;
            const wrongChars = Object.keys(wrong).length;

            onDone({ elapsed, len, wrongChars, wrong });
        }
    }

    function onDel(ctrl: boolean) {
        if (idx == 0) return;
        if (ctrl) {
            let end = idx - 1;
            for (; chars[end] != " " && end >= 0; end--) {
                if (wrong[end]) {
                    wrong[end] = false;
                }
            }

            setWrong(wrong);
            setIdx(end + 1);
        } else {
            if (wrong[idx - 1]) {
                wrong[idx - 1] = false;
                setWrong(wrong);
            }

            setIdx(idx - 1);
        }
    }

    return { onChar, onDel, wrong, idx };
}
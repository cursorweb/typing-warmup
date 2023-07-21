import { useRef, useState } from "react";
import { calcAcc } from "./wpm";

export function useTimer() {
    const timerRef = useRef<number>();
    return {
        beginTimer: () => timerRef.current = Date.now(),
        endTimer: () => Date.now() - timerRef.current!
    };
}

export function useTest(chars: string[], onDone: (elapsed: number, wrongLen: number, acc: number) => void) {
    const [idx, setIdx] = useState(0);
    const [wrong, setWrong] = useState<Record<number, boolean>>({});
    const { beginTimer, endTimer } = useTimer();

    function onChar(char: string) {
        const actual = chars[idx];

        if (char != actual) {
            setWrong({ ...wrong, [idx]: true });
        }

        if (idx == 0) {
            beginTimer();
        }

        if (idx < chars.length - 1) {
            setIdx(idx + 1);
        } else {
            const elapsed = endTimer();
            const wrongLen = Object.keys(wrong).length;
            const acc = calcAcc(chars.length, wrongLen);
            onDone(elapsed, wrongLen, acc);
        }
    }

    function onDel() {
        if (idx == 0) {
            return;
        }

        const pIdx = idx - 1;
        if (wrong[pIdx]) {
            setWrong({ ...wrong, [pIdx]: false });
        }

        setIdx(pIdx);
    }

    return { idx, wrong, onChar, onDel };
}
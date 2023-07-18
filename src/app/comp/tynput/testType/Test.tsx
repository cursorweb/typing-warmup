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

export function useTest() {
    const [idx, setIdx] = useState(0);
    const [wrong, setWrong] = useState<Set<number>>(new Set());
    const timerRef = useRef<number>();

    return {
        idx, setIdx, wrong, setWrong,
        beginTimer: () => timerRef.current = Date.now(),
        endTimer: () => Date.now() - timerRef.current!
    }
}
import styles from "./Test.module.css";
import React from "react";

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

export function Word({ children }: { children: React.JSX.Element[] }) {
    return (
        <div className={styles.word}>{children}</div>
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
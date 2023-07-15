import styles from "./Test.module.css";
import React from "react";

export class WPMResult {
    chars: number;
    correct: number;
    wrong: number;
    start!: Date;
    endTime!: Date;

    constructor() {
        this.chars = 0;
        this.correct = 0;
        this.wrong = 0;
    }

    begin() {
        this.start = new Date();
    }

    end() {
        this.endTime = new Date();
    }

    calcWpm() {
        const words = this.chars / 5;
        const errors = this.chars - this.correct;

        const time = (this.endTime.getTime() - this.start.getTime()) / (1000 * 60);
        return Math.max(0, (words - errors / 5) / time);
    }

    calcAcc() {
        const words = this.chars;
        const errors = this.wrong;
        return (1 - errors / words) * 100;
    }
}

export function Char({ char, state }: { char: string, state: "correct" | "wrong" | "" | "curr" }) {
    return (
        <pre className={`${styles.char} ${char == " " ? styles.space : ""} ${state ? styles[state] : ""}`}>{char}</pre>
    );
}

export function Word({ children }: { children: React.JSX.Element[] }) {
    return (
        <span>{children}</span>
    );
}

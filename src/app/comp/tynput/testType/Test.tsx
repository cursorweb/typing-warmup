import styles from "./Test.module.css";
import React from "react";

export abstract class Test {
    
}

export function Char({ char, state }: { char: string, state: "correct" | "wrong" | "" | "curr" }) {
    return (
        <pre className={`${styles.char} ${char == " " ? styles.space : ""} ${styles[state]}`}>{char}</pre>
    );
}

export function Word({ children }: { children: React.JSX.Element[] }) {
    return (
        <span>{children}</span>
    );
}

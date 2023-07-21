import styles from "./Char.module.css";

export function Char({ char, state }: { char: string, state?: "correct" | "wrong" | "curr" | null }) {
    return (
        <pre className={`${styles.char} ${char == " " ? styles.space : ""} ${state ? styles[state] : ""}`}>{char}</pre>
    );
}
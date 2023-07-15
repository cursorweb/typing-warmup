import styles from "./Tynput.module.css";
import { Test } from "./testType/Test";
import { useEffect, useRef, useState } from "react";

export function Tynput({ test }: { test?: Test }) {
    const [isFocused, setIsFocused] = useState(false);
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            e.preventDefault();
            input.current?.focus();
        };

        document.body.addEventListener("keydown", listener);

        return () => document.body.removeEventListener("keydown", listener);
    }, []);

    return (
        <>
            <div>is focused: {isFocused ? "yes" : "no"}</div>
            <input
                className={styles.tynput}
                ref={input}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
            />
        </>
    );
}

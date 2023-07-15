import styles from "./Tynput.module.css";
import { useEffect, useRef } from "react";

interface TynputProps {
    onChar: (c: string) => void;
    onDel: (amt: number) => void;
    /**
     * If has words is true, then onDel(n > 1) can be called
     * Also, after typing a character, the input will *clear* if hasWords is false.
     */
    hasWords: boolean;
}

export function Tynput({ onChar, onDel, hasWords }: TynputProps) {
    const isFocusedRef = useRef(false);
    const inputValRef = useRef("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();

        const listener = (e: KeyboardEvent) => {
            if (!isFocusedRef.current) {
                e.preventDefault();
                inputRef.current?.focus();
                isFocusedRef.current = true;
            }
        };

        document.body.addEventListener("keydown", listener);

        return () => document.body.removeEventListener("keydown", listener);
    }, []);

    return (
        <>
            <input
                className={styles.tynput}
                ref={inputRef}
                onBlur={() => isFocusedRef.current = false}
                onFocus={() => isFocusedRef.current = true}
                onInput={e => {
                    const target = e.target as HTMLInputElement;
                    onChar(target.value);
                    if (!hasWords) {
                        target.value = "";
                    } else {
                        inputValRef.current = target.value;
                    }
                }}
                onKeyDown={e => {
                    if (e.key == "Backspace") {
                        if (!hasWords) {
                            onDel(1);
                        } else {
                            // todo i guess LMAO
                        }
                    }
                }}
            />
        </>
    );
}
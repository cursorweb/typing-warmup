import styles from "./Tynput.module.css";
import { useEffect, useRef, useState } from "react";

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
    const [isFocused, setIsFocused] = useState(true);
    const inputValRef = useRef("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();

        const listener = (e: KeyboardEvent) => {
            if ((e.target as HTMLElement).tagName.toUpperCase() == "INPUT") {
                return;
            }

            e.preventDefault();
            inputRef.current?.focus();
            setIsFocused(true);
        };

        document.body.addEventListener("keydown", listener);

        return () => document.body.removeEventListener("keydown", listener);
    }, []);

    function onBlur() {
        setIsFocused(false);
    }

    function onFocus() {
        setIsFocused(true);
    }

    return (
        <>
            <div
                style={{
                    display: isFocused ? "none" : undefined
                }}
                hidden={isFocused}
                className={styles.overlay}
                onClick={() => inputRef.current?.focus()}
            >
                Type or Click to focus
            </div>

            <input
                className={styles.tynput}
                ref={inputRef}
                onBlur={onBlur}
                onFocus={onFocus}
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
                            console.log(inputValRef.current);
                            // todo i guess LMAO
                        }
                    }
                }}
            />
        </>
    );
}
import styles from "./Tynput.module.css";
import { FormEventHandler, KeyboardEventHandler, useEffect, useRef, useState } from "react";

interface TynputProps {
    onChar: (c: string) => void;
    onDel: () => void;
    /**
     * If has words is true, then onDel(n > 1) can be called
     * Also, after typing a character, the input will *clear* if hasWords is false.
     */
    hasWords?: boolean;
}

export function Tynput({ onChar, onDel }: TynputProps) {
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

    const onInput: FormEventHandler<HTMLInputElement> = e => {
        const target = e.target as HTMLInputElement;
        onChar(target.value);
        target.value = "";
    }

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
        if (e.key == "Backspace") {
            onDel();
        }
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
                // className={styles.tynput}

                ref={inputRef}

                onBlur={onBlur}
                onFocus={onFocus}
                onInput={onInput}
                onKeyDown={onKeyDown}

                // --- autocomplete stuff ---
                autoComplete="off"
                spellCheck="false"
                autoCapitalize="off"
                autoCorrect="off"
                data-gramm="false"
                data-gramm_editor="false"
                data-enable-grammarly="false"
            />
        </>
    );
}

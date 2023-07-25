import { useRef, useEffect, useState } from "react";
import styles from "./TestCont.module.css";
import React from "react";

export function TestCont({ restart, children, isTyping }: { restart: () => void, isTyping: boolean } & React.PropsWithChildren) {
    const restartButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        function keydown(e: KeyboardEvent) {
            if (e.key == "Tab") {
                restartButtonRef.current?.click();
                e.preventDefault();
            }
        }

        document.body.addEventListener("keydown", keydown);
        return () => document.body.removeEventListener("keydown", keydown);
    }, []);

    return (
        <div>
            {isTyping
                ? <div className={styles.testCont}>{children}</div>
                : children}
            <button onClick={restart} ref={restartButtonRef}>{isTyping ? "Restart" : "Next"} (Tab)</button>
        </div>
    );
}

export function PracticeButton({ onClick }: { onClick: () => void }) {
    const redoButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        function keydown(e: KeyboardEvent) {
            if (e.key == "Enter") {
                redoButtonRef.current?.click();
                e.preventDefault();
            }
        }

        document.body.addEventListener("keydown", keydown);
        return () => document.body.removeEventListener("keydown", keydown);
    }, []);

    return (
        <button onClick={onClick} ref={redoButtonRef}>Practice Wrong (Enter)</button>
    );
}
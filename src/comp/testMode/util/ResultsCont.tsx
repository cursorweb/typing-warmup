import React, { useRef, useEffect } from "react";

export function ResultsCont({ children, restart, practice }: { restart?: () => void, practice: () => void } & React.PropsWithChildren) {
    return (
        <div>
            {children}
            <div>
                {restart ? <RestartButton onClick={restart} /> : null}
                <PracticeButton onClick={practice} />
            </div>
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

export function RestartButton({ onClick }: { onClick: () => void }) {
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
        <button onClick={onClick} ref={restartButtonRef}>Restart (Tab)</button>
    );
}
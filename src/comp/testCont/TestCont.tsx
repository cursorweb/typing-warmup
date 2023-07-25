import { useRef, useEffect, useState } from "react";
import styles from "./TestCont.module.css";
import React from "react";
import { CharTestResult } from "comp/testType/CharTest";
import { WordTestResult } from "comp/testType/WordTest";


export function TestCont({ restart, children, isTyping }: { restart: () => void, isTyping: boolean } & React.PropsWithChildren) {
    const restartButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        document.body.addEventListener("keydown", e => {
            if (e.key == "Tab") {
                restartButtonRef.current?.click();
                e.preventDefault();
            }
        });
    }, []);

    return (
        <div>
            {isTyping
                ? <div className={styles.testCont}>{children}</div>
                : children}
            <button onClick={restart} ref={restartButtonRef}>Restart (Tab)</button>
        </div>
    );
}

interface WordTestContProps {
    /**
     * Make sure this has `key={random}`
     */
    genTest(doneCallback: (res: WordTestResult) => void): React.JSX.Element;
    genResult(result: WordTestResult, redoTest: (el: React.JSX.Element) => void): React.JSX.Element;
}

export function WordTestCont({ genTest, genResult }: WordTestContProps) {
    const [render, setRender] = useState(genTest(doneCallback));
    const [isTyping, setisTyping] = useState(true);

    const restartButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        document.body.addEventListener("keydown", e => {
            if (e.key == "Tab") {
                restartButtonRef.current?.click();
                e.preventDefault();
            }
        });
    }, []);

    function doneCallback(res: WordTestResult) {
        setisTyping(false);
        setRender(genResult(res, el => setRender(el)));
    }

    return (
        <>
            {isTyping
                ? <div className={styles.testCont}>
                    {render}
                </div>
                : <div>
                    {render}
                </div>
            }
            <button onClick={() => setRender(genTest(doneCallback))} ref={restartButtonRef}>Restart (Tab)</button>
        </>
    );
}
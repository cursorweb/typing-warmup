import { useRef, useEffect, useState } from "react";
import styles from "./TestCont.module.css";
import React from "react";

interface TestContProps<T> {
    /**
     * Make sure this has `key={random}`
     */
    genTest(doneCallback: (res: T) => void): React.JSX.Element;
    genResult(result: T, redoTest: (el: React.JSX.Element) => void): React.JSX.Element;
}

export function TestCont<T>({ genTest, genResult }: TestContProps<T>) {
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

    function doneCallback(res: T) {
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

import { WordTestResult } from "comp/testType/WordTest";
import { useState, useRef, useEffect } from "react";
import { TestCont } from "./TestCont";

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
        <TestCont isTyping={isTyping} restart={() => {
            setisTyping(true);
            setRender(genTest(doneCallback));
        }}>{render}</TestCont>
    );
}
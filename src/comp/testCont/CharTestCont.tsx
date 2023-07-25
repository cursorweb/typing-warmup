import { CharTestResult } from "comp/testType/CharTest";
import { useState, useRef, useEffect } from "react";
import { TestCont } from "./TestCont";

interface CharTestContProps {
    /**
     * Make sure this has `key={random}`
     */
    genTest(doneCallback: (res: CharTestResult) => void): React.JSX.Element;
    genResult(result: CharTestResult, redoTest: (el: React.JSX.Element) => void): React.JSX.Element;
}

export function CharTestCont({ genTest, genResult }: CharTestContProps) {
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

    function doneCallback(res: CharTestResult) {
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
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { CharTest } from "comp/testType/CharTest";
import { WordTest, WordTestResult } from "comp/testType/WordTest";
import { TestCont } from "comp/testCont/TestCont";

export default function App() {
    const chars = "the quick brown fox jumps over the lazy dog".split('');

    return (
        <>
            <TestCont
                genTest={(doneCallback) =>
                    <WordTest chars={chars} onDone={doneCallback} key={Math.random()} />
                }
                genResult={(res: WordTestResult) =>
                    <div>
                        <div>{res.wpm.toFixed(2)} WPM</div>
                        <div>{res.acc.toFixed(2)}% ACC</div>
                        <div>{res.wpms.map(({ wpm, word }, i) => <div style={{ display: "inline-block", margin: "0 20px" }} key={i}>
                            <div>{word}</div>
                            <div>{wpm.toFixed(2)}</div>
                        </div>)}</div>
                        <div>{res.wrongWords.map((word, i) => <span key={i}>{word}{' '}</span>)}</div>
                        {/* <button onClick={() => setTestState(<Word onDone={onDone} chars={res.wrongWords.join(" ").split("")} />)}>Redo Test</button> */}
                    </div>
                }
            />
        </>
    );
}
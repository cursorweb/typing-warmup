import { CharTest, CharTestResult } from "comp/testType/CharTest";
import { useState, useRef, useEffect, useReducer } from "react";
import { PracticeButton, TestCont } from "./TestCont";

interface CharTestContProps {
    genText: () => string[],
}

interface TestContState {
    isTyping: boolean,
    render: React.JSX.Element,
    genTest: () => React.JSX.Element
}

type TestContAction = { type: "restart" } | { type: "redo", genTest: () => React.JSX.Element } | { type: "done", render: React.JSX.Element };

function reducer(state: TestContState, action: TestContAction): TestContState {
    switch (action.type) {
        case "restart":
            return { ...state, isTyping: true, render: state.genTest() };
        case "redo":
            return { isTyping: true, render: action.genTest(), genTest: action.genTest };
        case "done":
            return { ...state, isTyping: false, render: action.render };
    }
}

export function CharTestCont({ genText }: CharTestContProps) {
    const [{ isTyping, render }, dispatch] = useReducer(reducer, null, () => {
        const genTest = () => <CharTest chars={genText()} onDone={onDone} />;
        return {
            isTyping: true,
            render: genTest(),
            genTest
        };
    });

    function onDone(res: CharTestResult) {
        dispatch({
            type: "done",
            render: (
                <div>
                    <div>
                        <div>{res.cpm.toFixed(2)} CPM ({(res.cpm / 5).toFixed(2)} WPM)</div>
                        <div>{res.acc.toFixed(2)}% ACC</div>
                        <div>{res.wrongChars.map((c, i) => <span key={i}>{c}{' '}</span>)}</div>
                        <PracticeButton onClick={() => {
                            dispatch({ type: "redo", genTest: () => <CharTest chars={res.wrongChars} onDone={onDone} /> })
                        }} />
                    </div>
                </div>
            )
        });
    }

    return (
        <TestCont
            isTyping={isTyping}
            restart={() => dispatch({ type: "restart" })}
        >{render}</TestCont>
    );
}
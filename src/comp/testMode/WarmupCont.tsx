import { CharTest, CharTestResult } from "comp/testType/CharTest";
import { WordTest, WordTestResult } from "comp/testType/WordTest";
import warmups from "data/warmups.json";
import { randomk } from "./util/random";
import { TestCont } from "./util/TestCont";
import { useReducer } from "react";

interface WarmupState {
    isTyping: boolean,
    results: React.JSX.Element[],
    render: React.JSX.Element,
    idx: number,
    len: number,
    genTest: (idx: number) => React.JSX.Element
}

type TestContAction = { type: "restart" }
    | { type: "next", result: React.JSX.Element };

function reducer(state: WarmupState, action: TestContAction): WarmupState {
    switch (action.type) {
        case "restart":
            return { ...state, isTyping: true, render: state.genTest(state.idx) };

        case "next":
            if (state.idx < state.len - 1) {
                return { ...state, render: state.genTest(state.idx + 1), idx: state.idx + 1, results: [...state.results, action.result] };
            } else {
                return { ...state, isTyping: false, render: <>{[...state.results, action.result]}</>, idx: 0 };
            }
    }
}

export function WarmupCont({ wIdx }: { wIdx: number }) {
    const warmupData = warmups[wIdx];

    const [{ isTyping, render, idx }, dispatch] = useReducer(reducer, null, () => ({
        isTyping: true,
        results: [],
        render: genTest(0),
        idx: 0,
        len: warmupData.tests.length,
        genTest
    }));

    function onCharDone(res: CharTestResult) {
        dispatch({
            type: "next",
            result: (
                <div key={idx}>
                    <div>char test: {res.cpm} / {res.acc}</div>
                </div>
            )
        });
    }

    function onWordDone(res: WordTestResult) {
        dispatch({
            type: "next",
            result: (
                <div key={idx}>
                    <div>word test: {res.wpm} / {res.acc}</div>
                </div>
            )
        });
    }
    function genTest(idx: number) {
        const data = warmupData.tests[idx];
        if (data.noSpace) {
            return <CharTest chars={randomk(data.list, 10, true)} onDone={onCharDone} key={Math.random()} />;
        } else {
            return <WordTest chars={randomk(data.list, 10, false)} onDone={onWordDone} key={Math.random()} />;
        }
    }

    return (
        <TestCont
            isTyping={isTyping}
            restart={() => dispatch({ type: "restart" })}
        >{render}</TestCont>
    );
}
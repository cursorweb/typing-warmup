import { CharTest, CharTestResult } from "comp/testType/CharTest";
import { WordTest, WordTestResult } from "comp/testType/WordTest";
import warmups from "data/warmups.json";
import { randomk } from "./util/random";
import { TestCont } from "./util/TestCont";
import { useReducer } from "react";
import { ResultsCont } from "./util/ResultsCont";
import { CharTestCont } from "./CharTestCont";

interface WarmupState {
    isTyping: boolean,
    results: React.JSX.Element[],
    render: React.JSX.Element,
    idx: number,
    len: number,
    genTest: (idx: number) => React.JSX.Element
}

// note: use results only as an escape hatch
type TestContAction = { type: "restart" }
    | { type: "next", result: React.JSX.Element }
    | { type: "practice", render: React.JSX.Element }
    | { type: "results" };

function reducer(state: WarmupState, action: TestContAction): WarmupState {
    switch (action.type) {
        case "restart":
            return {
                ...state,
                isTyping: true,
                render: state.genTest(state.idx)
            };

        case "next":
            const results = [...state.results, action.result];
            if (state.idx < state.len - 1) {
                return {
                    ...state,
                    render: state.genTest(state.idx + 1),
                    idx: state.idx + 1,
                    results
                };
            } else {
                return {
                    ...state,
                    isTyping: false,
                    render: <>{results}</>,
                    idx: 0,
                    results
                };
            }
        
        case "results":
            return {
                ...state,
                isTyping: false,
                render: <>{[...state.results]}</>
            };

        case "practice":
            return {
                ...state,
                isTyping: true,
                render: action.render
            };
    }
}

export function WarmupCont({ wIdx }: { wIdx: number }) {
    const warmupData = warmups[wIdx];

    const onCharDone = (idx: number) => (res: CharTestResult) => {
        dispatch({
            type: "next",
            result: (
                <ResultsCont
                    key={idx}
                    practice={() => dispatch({
                        type: "practice",
                        render: <CharTest chars={res.wrongChars} onDone={() => dispatch({ type: "results" })} />
                    })}
                >
                    <div>char test: {res.cpm} / {res.acc}</div>
                </ResultsCont>
            )
        });
    };

    const onWordDone = (idx: number) => (res: WordTestResult) => {
        dispatch({
            type: "next",
            result: (
                <ResultsCont
                    key={idx}
                    practice={() => dispatch({
                        type: "practice",
                        render: <WordTest chars={res.wrongWords.join(" ").split("")} onDone={() => dispatch({ type: "results" })} />
                    })}
                >
                    <div>word test: {res.wpm} / {res.acc}</div>
                </ResultsCont>
            )
        });
    }

    const [{ isTyping, render, idx }, dispatch] = useReducer(reducer, null, () => ({
        isTyping: true,
        results: [],
        render: genTest(0),
        idx: 0,
        len: warmupData.tests.length,
        genTest
    }));

    function genTest(idx: number) {
        const data = warmupData.tests[idx];
        if (data.noSpace) {
            return <CharTest chars={randomk(data.list, 2, true)} onDone={onCharDone(idx)} key={Math.random()} />;
        } else {
            return <WordTest chars={randomk(data.list, 2, false)} onDone={onWordDone(idx)} key={Math.random()} />;
        }
    }

    return (
        <TestCont
            isTyping={isTyping}
            restart={() => dispatch({ type: "restart" })}
        >{render}</TestCont>
    );
}
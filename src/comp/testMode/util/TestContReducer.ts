import React, { useReducer } from "react";

interface TestContState {
    isTyping: boolean,
    render: React.JSX.Element,
    genTest: () => React.JSX.Element
}

type TestContAction = { type: "restart" } | { type: "redo", genTest: () => React.JSX.Element } | { type: "done", render: React.JSX.Element };

export function reducer(state: TestContState, action: TestContAction): TestContState {
    switch (action.type) {
        case "restart":
            return { ...state, isTyping: true, render: state.genTest() };
        case "redo":
            return { isTyping: true, render: action.genTest(), genTest: action.genTest };
        case "done":
            return { ...state, isTyping: false, render: action.render };
    }
}

export function useTestReducer(genTest: () => React.JSX.Element) {
    return useReducer(reducer, null, () => {
        return {
            isTyping: true,
            render: genTest(),
            genTest
        }
    });
}
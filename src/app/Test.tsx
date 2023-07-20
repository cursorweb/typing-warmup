import { FormEvent, FormEventHandler, KeyboardEventHandler, useEffect, useMemo, useReducer, useRef, useState } from "react";

/*
- You can't skip a word
- It will record individual word wpm and total wpm
    - individual wpm: starts at first character, ends at last character
    - yep that's it
- Also I want smooth cursor :)
*/
const testStr = "the quick brown fox jumps over the lazy dog";

interface State {
    idx: number, // ??? V
    wrong: Record<number, boolean>, // ??? V
    text: string
}

type Action = { type: "char", val: string } | { type: "del" };

function reducer(state: State, action: Action) {
    switch (action.type) {
        case "char":
            const char = action.val;
            const idx = state.idx;
            const actual = state.text[idx];

            const newState = { ...state, idx: idx + 1 };

            if (char != actual) {
                newState.wrong[idx] = true;
            }

            return newState;

        case "del":
            if (state.idx > 0) {
                const pIdx = state.idx - 1;
                const newState = { ...state, idx: pIdx };

                if (newState.wrong[pIdx]) {
                    newState.wrong[pIdx] = false;
                }

                return newState;
            }
            break;
    }

    return state;
}

export function Test({ text = testStr }) {
    const startEnd = [];

    let i = 0;
    for (const word of text.split(" ")) {
        startEnd.push([i, i + word.length - 1]);
        i += word.length + 1; // notice we skip the space
    }

    const initialState: State = {
        idx: 0,
        wrong: {},
        text
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    console.log('rerender')

    const onChange: FormEventHandler<HTMLInputElement> = e => {
        const el = (e.target as HTMLInputElement);
        dispatch({ type: "char", val: el.value });
        el.value = "";
    }

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
        const key = e.key;
        if (key == "Backspace") {
            dispatch({ type: "del" });
        }
    }

    const spanRef = useRef<HTMLDivElement>(null);

    const pos = useMemo(() => {
        let span = spanRef.current?.children[state.idx] as HTMLSpanElement;
        if (span) {
            let left = span.offsetLeft + span.offsetWidth - 2;
            let top = span.offsetTop - 2;
            let height = span.offsetHeight;
            return { left, top, height };
        } else {
            return { left: -2, top: 2, height: "5px" };
        }
    }, [state.idx]);

    return (<>
        {JSON.stringify(state)}

        <span style={{
            transition: "all 0.2s",
            // height: "22px",
            width: "2px",
            background: "white",
            position: "absolute",
            ...pos
        }} />

        <div ref={spanRef}>
            {text.split("").map((c, i) => <span key={i} style={{
                background: i == state.idx ? "blue" : "black",
                color: state.wrong[i] ? "red" : "white",
                fontSize: "22px",
                lineHeight: "32px",
                transition: "0.2s background"
            }}>{c}</span>)}
        </div>

        <input
            onKeyDown={onKeyDown}
            onChange={onChange}
        />
    </>);
}

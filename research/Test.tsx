import { FormEventHandler, KeyboardEventHandler, useMemo, useReducer, useRef } from "react";

/*
- You can't skip a word
- It will record individual word wpm and total wpm
    - individual wpm: starts at first character, ends at last character
    - yep that's it
- Also I want smooth cursor :)
*/
const testStr = "the quick brown fox jumps over the lazy dog";

interface State {
    idx: number,
    wrong: Record<number, boolean>,
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
            let left = span.offsetLeft;
            let top = span.offsetTop;
            return { left, top };
        } else {
            return { left: 0, top: 0 };
        }
    }, [state.idx]);

    return (<>
        <div>
            {JSON.stringify(state, null, 2)}
        </div>

        <div style={{ position: "relative" }}>
            <span style={{
                transition: "all 0.2s",
                height: "7ex", // the formula: lineHeight + fontSize / 2
                width: "5px",
                borderRadius: "4px",
                background: "gray",
                position: "absolute",
                ...pos
            }} />

            <div ref={spanRef}>
                {text.split("").map((c, i) => <span key={i} style={{
                    background: i == state.idx ? "#255" : "black",
                    color: state.wrong[i] ? "red" : "white",
                    // lineheight = 2*fontsize
                    fontSize: "5ex",
                    lineHeight: "10ex"
                    // transition: "0.2s background"
                }}>{c}</span>)}
            </div>
        </div>

        <input
            onKeyDown={onKeyDown}
            onChange={onChange}
        />
    </>);
}

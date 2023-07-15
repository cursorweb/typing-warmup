import { useState } from "react";
import { Tynput } from "../Tynput";
import { Char } from "./Test";

export function CharTest({ chars }: { chars: string[] }) {
    const [idx, setIdx] = useState(0);
    const [wrong, setWrong] = useState<Record<string, boolean>>({});

    function onChar(char: string) {
        const actual = chars[idx];
        if (char != actual) {
            setWrong(Object.assign({ [idx]: true }, wrong));
        }

        // end the test LMAO
        setIdx(idx + 1);
    }

    function onDel() {
        if (idx > 0) {
            if (wrong[idx - 1]) {
                delete wrong[idx - 1];
            }

            setIdx(idx - 1);
        }
    }

    return (
        <>
            {chars.map((c, i) => {
                if (i < idx) {
                    return <Char char={c} state={wrong[i] ? "wrong" : "correct"} key={i} />;
                } else {
                    return <Char char={c} state={idx == i ? "curr" : ""} key={i} />;
                }
            })}
            <Tynput onChar={onChar} onDel={onDel} hasWords={false} />
        </>
    );
}
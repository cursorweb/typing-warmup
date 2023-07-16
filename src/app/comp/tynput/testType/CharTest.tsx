import { useRef, useState } from "react";
import { Tynput } from "../Tynput";
import { Char, CharTestResult, calcAcc, calcCPM } from "./Test";

interface CharTestProps {
    chars: string[];
    onDone: (result: CharTestResult) => void;
}

export function CharTest({ chars, onDone }: CharTestProps) {
    const [idx, setIdx] = useState(0);
    const [wrong, setWrong] = useState<Set<number>>(new Set());
    const timerRef = useRef<number>();

    function onChar(char: string) {
        const actual = chars[idx];
        if (char != actual) {
            setWrong(wrong.add(idx));
        }

        if (idx == 0) {
            timerRef.current = Date.now();
            console.log('set')
        }

        if (idx < chars.length - 1) {
            setIdx(idx + 1);
        } else {
            const elapsed = Date.now() - timerRef.current!;
            const len = chars.length;
            const wrongChars = wrong.size;
            
            onDone({
                cpm: calcCPM(len, wrongChars, elapsed),
                acc: calcAcc(len, wrongChars),
                wrong: [...wrong].map(i => chars[i])
            });
        }
    }

    function onDel() {
        if (idx > 0) {
            if (wrong.has(idx - 1)) {
                setWrong(w => {
                    w.delete(idx - 1);
                    return w;
                });
            }

            setIdx(idx - 1);
        }
    }

    return (
        <>
            {chars.map((c, i) => {
                if (i < idx) {
                    return <Char char={c} state={wrong.has(i) ? "wrong" : "correct"} key={i} />;
                } else {
                    return <Char char={c} state={idx == i ? "curr" : ""} key={i} />;
                }
            })}

            <Tynput
                onChar={onChar}
                onDel={onDel}
                hasWords={false}
            />
        </>
    );
}
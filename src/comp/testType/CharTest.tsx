import { Tynput } from "comp/tynput/Tynput";
import { Char, SmoothCursor, calcCPM, useTest } from "./util";

export interface CharTestResult {
    cpm: string;
    wpm: string;
    acc: string;
    wrongChars: string[];
}

interface CharTestProps {
    chars: string[];
    onDone: (result: CharTestResult) => void;
}

export function CharTest({ chars, onDone }: CharTestProps) {
    const { idx, wrong, onChar, onDel } = useTest(chars, { handleDone });

    function handleDone(elapsed: number, wrongLen: number, acc: string) {
        const wrongChars = Object.keys(wrong).map(k => chars[k as `${number}`]);
        const cpm = calcCPM(chars.length, wrongLen, elapsed);

        onDone({
            cpm: cpm.toFixed(2),
            wpm: (cpm / 5).toFixed(2),
            wrongChars: wrongChars,
            acc
        });
    }

    return (
        <>
            <SmoothCursor idx={idx}>
                {chars.map((c, i) => {
                    if (i < idx) {
                        return <Char char={c} state={wrong[i] ? "wrong" : "correct"} key={i} />;
                    } else {
                        return <Char char={c} state={idx == i ? "curr" : null} key={i} />;
                    }
                })}
            </SmoothCursor>

            <Tynput
                onChar={onChar}
                onDel={onDel}
            />
        </>
    );
}

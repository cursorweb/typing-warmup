import { Tynput } from "comp/tynput/Tynput";
import { Char, SmoothCursor, calcCPM, useTest } from "./util";

interface CharTestResult {
    cpm: number;
    acc: number;
    wrongChars: string[];
}

interface CharTestProps {
    chars: string[];
    onDone: (result: CharTestResult) => void;
}

export function CharTest({ chars, onDone }: CharTestProps) {
    const { idx, wrong, onChar, onDel } = useTest(chars, { handleDone });

    function handleDone(elapsed: number, wrongLen: number, acc: number) {
        const wrongChars = Object.keys(wrong).map(k => chars[Number(k)]);
        const cpm = calcCPM(chars.length, wrongLen, elapsed);

        onDone({
            cpm,
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

import { Tynput } from "comp/tynput/Tynput";
import { useTest, SmoothCursor, Char } from "./util";

interface WordTestResult {
    wpm: number;
    acc: number;
    wrong: string[];
    wpms: number[];
    slow: string[];
}

interface WordTestProps {
    chars: string[];
    onDone: (result: WordTestResult) => void;
}

export function WordTest({ chars, onDone }: WordTestProps) {
    const { idx, wrong, onChar, onDel } = useTest(chars, () => {
        
    });

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

import { Tynput } from "../Tynput";
import { Char, CharTestResult, calcAcc, calcCPM, useTest, useTestProps } from "./Test";

interface CharTestProps {
    chars: string[];
    onDone: (result: CharTestResult) => void;
}

export function CharTest({ chars, onDone }: CharTestProps) {
    const { onChar, onDel, wrong, idx } = useTest(chars, ({ len, wrongChars, elapsed }) => {
        onDone({
            cpm: calcCPM(len, wrongChars, elapsed),
            acc: calcAcc(len, wrongChars),
            wrong: [...wrong].map(i => chars[i])
        });
    });

    return (
        <>
            <div>
                {chars.map((c, i) => {
                    if (i < idx) {
                        return <Char char={c} state={wrong.has(i) ? "wrong" : "correct"} key={i} />;
                    } else {
                        return <Char char={c} state={idx == i ? "curr" : ""} key={i} />;
                    }
                })}
            </div>

            <Tynput
                onChar={onChar}
                onDel={onDel}
            />
        </>
    );
}

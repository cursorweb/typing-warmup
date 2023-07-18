import { Char, WordTestResult, useTest } from "./Test";
import { Tynput } from "../Tynput";

interface WordTestProps {
    words: {
        wordMap: string[][];
        chars: string[];
    }
    onDone: (result: WordTestResult) => void;
}

export function WordTest({ words: { wordMap, chars }, onDone }: WordTestProps) {
    const {
        idx, setIdx,
        wrong, setWrong,
        beginTimer, endTimer
    } = useTest();

    function onChar(char: string) {
        const actual = chars[idx];

        if (char != actual) {
            setWrong(wrong.add(idx));
        }

        if (idx == 0) {
            beginTimer();
        }

        if (idx < chars.length - 1) {
            setIdx(idx + 1);
        } else {
            const elapsed = endTimer();
            const len = chars.length;
            const wrongChars = wrong.size;

            // onDone({
            //     wpm: calcWPM(len, wrongChars, elapsed),
            //     acc: calcAcc(len, wrongChars),
            //     wrong: [...wrong]
            // });
        }

        setIdx(idx + 1);
    }

    function onDel(ctrl: boolean) {
        if (idx > 0) {
            if (ctrl) {
                let end = idx - 1;
                for (; chars[end] != " " && end >= 0; end--) {
                    if (wrong.has(end)) {
                        wrong.delete(end);
                    }
                }

                setWrong(wrong);
                setIdx(end + 1);
            } else {
                if (wrong.has(idx - 1)) {
                    setWrong(w => {
                        w.delete(idx - 1);
                        return w;
                    });
                }

                setIdx(idx - 1);
            }
        }
    }

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

export function wordMapToChars(wordMap: string[][]) {
    return {
        wordMap,
        chars: wordMap.flatMap((w, i) => i > 0 ? [" ", ...w] : w)
    };
}
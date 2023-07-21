import { useMemo, useRef, useState } from "react";
import { Tynput } from "comp/tynput/Tynput";
import { Char } from "./util/Test";

interface CharTestResult {
    cpm: number;
    acc: number;
    wrong: string[];
}

interface CharTestProps {
    chars: string[];
    onDone: (result: CharTestResult) => void;
}

export function CharTest({ chars, onDone }: CharTestProps) {
    const [idx, setIdx] = useState(0);
    const [wrong, setWrong] = useState<Record<number, boolean>>({});

    const spanContRef = useRef<HTMLDivElement>(null);

    function onChar(char: string) {
        const actual = chars[idx];

        if (char != actual) {
            setWrong({ ...wrong, [idx]: true });
        }

        setIdx(idx + 1);
    }

    function onDel() {
        if (idx == 0) {
            return;
        }

        const pIdx = idx - 1;
        if (wrong[pIdx]) {
            setWrong({ ...wrong, [pIdx]: false });
        }

        setIdx(pIdx);
    }

    const pos = useMemo(() => {
        if (spanContRef.current) {
            const span = spanContRef.current.children[idx] as HTMLSpanElement;
            if (!span) return { left: 0, right: 0 }; // todo
            const left = span.offsetLeft;
            const top = span.offsetTop;
            return { left, top };
        }
    }, [idx]);

    return (
        <>
            <div style={{ position: "relative" }}>
                <div ref={spanContRef}>
                    {chars.map((c, i) => {
                        if (i < idx) {
                            return <Char char={c} state={wrong[i] ? "wrong" : "correct"} key={i} />;
                        } else {
                            return <Char char={c} state={idx == i ? "curr" : null} key={i} />;
                        }
                    })}
                </div>

                <span style={{
                    transition: "all 0.2s",
                    height: 1.5 * 24 + "px", // the formula: fontSize * lineHeight
                    width: "2px",
                    borderRadius: "4px",
                    background: "blue",
                    position: "absolute",
                    ...pos
                }} />
            </div>

            <Tynput
                onChar={onChar}
                onDel={onDel}
            />
        </>
    );
}

import { useState } from "react";
import tests from "data/tests.json";
import "./App.css";
import { CharTestCont } from "comp/testMode/CharTestCont";

export default function App() {
    const [idx, setIdx] = useState<number | null>(null);

    return (
        <>
            <div>
                {tests.map((data, i) =>
                    <div key={i} style={{ display: "inline-block", margin: 10 }}>
                        <div>{data.title}</div>
                        <div>{data.desc}</div>
                        <button onClick={() => setIdx(i)}>Begin</button>
                    </div>
                )}
            </div>
            {idx != null ? <CharTestCont genText={() => genText(tests[idx].list)} key={Math.random()} /> : null}
        </>
    );
}

function genText(list: string[]) {
    return new Array(50).fill(null).map(() => list[Math.floor(Math.random() * list.length)]);
}
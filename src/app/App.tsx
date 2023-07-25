import { useEffect, useRef, useState } from "react";
import "./App.css";
import { CharTest, CharTestResult } from "comp/testType/CharTest";
import { WordTest, WordTestResult } from "comp/testType/WordTest";
import { CharTestCont } from "comp/testMode/CharTestCont";

export default function App() {
    // const chars = "the quick brown fox jumps over the lazy dog".split('');
    const chars = "thequickbrownfoxjumpsoverthelazydog".split('');

    return (
        <>
            <CharTestCont
                // genTest={(doneCallback) =>
                //     <CharTest chars={chars} onDone={doneCallback} key={Math.random()} />
                // }
                // genResult={(res: CharTestResult) =>
                //     <div>
                //         <div>{res.cpm} CPM ({res.cpm / 5} WPM)</div>
                //         <div>{res.acc.toFixed(2)}% ACC</div>
                //         <div>{res.wrongChars.map((c, i) => <span key={i}>{c}{' '}</span>)}</div>
                //         {/* <button onClick={() => setTestState(<Word onDone={onDone} chars={res.wrongWords.join(" ").split("")} />)}>Redo Test</button> */}
                //     </div>
                // }
                genText={() => new Array(35).fill(null).map(() => chars[Math.floor(Math.random() * chars.length)])}
            />
        </>
    );
}
import { WordTest, WordTestResult } from "comp/testType/WordTest";
import { PracticeButton, TestCont } from "./util/TestCont";
import { useTestReducer } from "./util/TestContReducer";

export function WordTestCont({ genText }: { genText: () => string[] }) {
    const [{ isTyping, render }, dispatch] = useTestReducer(() => <WordTest chars={genText()} onDone={onDone} key={Math.random()} />);

    function onDone(res: WordTestResult) {
        dispatch({
            type: "done",
            render: (
                <div>
                    <div>{res.wpm.toFixed(2)} WPM</div>
                    <div>{res.acc.toFixed(2)}% ACC</div>
                    <div>
                        {res.wpms.map(({ wpm, word }, i) =>
                            <div style={{ display: "inline-block", margin: 10 }} key={i}>
                                <div>{word}</div>
                                <div>{wpm.toFixed(2)}wpm</div>
                            </div>
                        )}
                    </div>
                    <PracticeButton onClick={() => 
                        dispatch({
                            type: "redo",
                            genTest: () => <WordTest chars={res.wrongWords.join(" ").split("")} onDone={onDone} key={Math.random()} />
                        })} />
                </div>
            )
        })
    }

    return (
        <TestCont
            isTyping={isTyping}
            restart={() => dispatch({ type: "restart" })}
        >{render}</TestCont>
    );
}
import { WordTest, WordTestResult } from "comp/testType/WordTest";
import { TestCont } from "./util/TestCont";
import { useTestReducer } from "./util/TestContReducer";
import { ResultsCont } from "./util/ResultsCont";

export function WordTestCont({ genText }: { genText: () => string[] }) {
    const [{ isTyping, render }, dispatch] = useTestReducer(() => <WordTest chars={genText()} onDone={onDone} key={Math.random()} />);

    function onDone(res: WordTestResult) {
        dispatch({
            type: "done",
            render: (
                <ResultsCont
                    restart={() => dispatch({ type: "restart" })}
                    practice={() => dispatch({
                        type: "redo",
                        genTest: () => <WordTest chars={res.wrongWords.join(" ").split("")} onDone={onDone} key={Math.random()} />
                    })}
                >
                    <div>{res.wpm} WPM</div>
                    <div>{res.acc}% ACC</div>
                    <div>
                        {res.wpms.map(({ wpm, word }, i) =>
                            <div style={{ display: "inline-block", margin: 10 }} key={i}>
                                <div>{word}</div>
                                <div>{wpm.toFixed(2)}wpm</div>
                            </div>
                        )}
                    </div>
                </ResultsCont>
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
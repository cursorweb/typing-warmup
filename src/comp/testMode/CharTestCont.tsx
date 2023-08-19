import { CharTest, CharTestResult } from "comp/testType/CharTest";
import { TestCont } from "./util/TestCont";
import { useTestReducer } from "./util/TestContReducer";
import { ResultsCont } from "./util/ResultsCont";

export function CharTestCont({ genText }: { genText: () => string[] }) {
    const [{ isTyping, render }, dispatch] = useTestReducer(() => <CharTest chars={genText()} onDone={onDone} />);

    function onDone(res: CharTestResult) {
        dispatch({
            type: "done",
            render: (
                <ResultsCont
                    restart={() => dispatch({ type: "restart" })}
                    practice={() => dispatch({
                        type: "redo",
                        genTest: () => <CharTest chars={res.wrongChars} onDone={onDone} />
                    })}
                >
                    <div>{res.cpm} CPM ({res.wpm} WPM)</div>
                    <div>{res.acc}% ACC</div>
                    <div>{res.wrongChars.map((c, i) => <span key={i}>{c}{' '}</span>)}</div>
                </ResultsCont>
            )
        });
    }

    return (
        <TestCont
            isTyping={isTyping}
            restart={() => dispatch({ type: "restart" })}
        >{render}</TestCont>
    );
}
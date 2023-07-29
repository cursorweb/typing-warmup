import { CharTest, CharTestResult } from "comp/testType/CharTest";
import { PracticeButton, TestCont } from "./util/TestCont";
import { useTestReducer } from "./util/TestContReducer";

export function CharTestCont({ genText }: { genText: () => string[] }) {
    const [{ isTyping, render }, dispatch] = useTestReducer(() => <CharTest chars={genText()} onDone={onDone} />);

    function onDone(res: CharTestResult) {
        dispatch({
            type: "done",
            render: (
                <div>
                    <div>{res.cpm.toFixed(2)} CPM ({(res.cpm / 5).toFixed(2)} WPM)</div>
                    <div>{res.acc.toFixed(2)}% ACC</div>
                    <div>{res.wrongChars.map((c, i) => <span key={i}>{c}{' '}</span>)}</div>
                    <PracticeButton onClick={() =>
                        dispatch({
                            type: "redo",
                            genTest: () => <CharTest chars={res.wrongChars} onDone={onDone} />
                        })} />
                </div>
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
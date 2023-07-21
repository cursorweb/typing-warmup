import "./App.css";
import { Test } from "./Test";
import { CharTest } from "comp/testType/CharTest";
import { WordTest } from "comp/testType/WordTest";

function App() {
    return (
        <div style={{ position: "relative", padding: "10px" }}>
            {
                // ... whatever var
                <CharTest chars={"thequickbrownfoxjumpsoverthelazydog".split("")} onDone={console.log} />
                // <WordTest chars={"the quick brown fox jumps over the lazy dog".split("")} onDone={console.log} />
                // <Test />
            }
        </div>
    );
}

export default App;

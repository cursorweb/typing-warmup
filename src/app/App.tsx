import "./App.css";
import { CharTest } from "./comp/tynput/testType/CharTest";

function App() {
    return (
        <div>
            <CharTest chars={"thequickbrownfoxjumpsoverthelazydog".split("")} onDone={console.log} />
        </div>
    );
}

export default App;

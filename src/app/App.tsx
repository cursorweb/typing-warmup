import "./App.css";
import { CharTest } from "./comp/tynput/testType/CharTest";

function App() {
    return (
        <div>
            <CharTest chars={"thequickbrownfoxjumpsoverthelazydog".split("")} />
        </div>
    );
}

export default App;

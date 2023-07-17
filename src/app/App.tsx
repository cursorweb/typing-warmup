import { useState } from "react";
import "./App.css";
import { CharTest } from "./comp/tynput/testType/CharTest";

function App() {
    return (
        <div>
            {
                // ... whatever var
                <CharTest chars={"thequickbrownfoxjumpsoverthelazydog".split("")} onDone={console.log} />
            }
        </div>
    );
}

export default App;

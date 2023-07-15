import { useState } from "react";
import "./App.css";
import { Tynput } from "./comp/tynput/Tynput";

function App() {
    const show = useState(false);

    return (
        <div>
            <h1>Hello, world!</h1>
            <button onClick={() => show[1](!show[0])}>Show?</button>
            {!show[0] || <Tynput />}
        </div>
    );
}

export default App;

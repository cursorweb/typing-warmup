import "./modes/gen-selection.js";
import { WarmUpGenerator } from "./modes/warmups/warmup.js";
import { tynput } from "./typing/tynput.js";

const w = new WarmUpGenerator(0);
w.begin();
tynput.clear();
const k = new TestGenerator();
import "./modes/gen-selection.js";
import { TestGenerator } from "./modes/tests/test.js";
import { WarmUpGenerator } from "./modes/warmups/warmup.js";
import { tynput } from "./typing/tynput.js";

const w = new WarmUpGenerator(0);
w.begin();
tynput.clear();
const k = new TestGenerator(0);
k.begin();
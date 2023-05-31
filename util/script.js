const input = document.querySelector("input");
const btn = document.querySelector("button");
const out = document.querySelector("div");

input.addEventListener("keypress", e => {
    if (e.key == "Enter") {
        btn.click();
    }
});

btn.addEventListener("click", () => {
    out.textContent = `[${input.value.split("").map(k => JSON.stringify(k)).join(", ")}]`;
});
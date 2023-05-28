// export const wpmResultsCont = document.querySelector(".wpmresults-cont");
// export const wpmResults = document.querySelector(".wpmresults");
// export const typingPageCont = document.querySelector(".typing-cont");

export const pages = {
    results: document.querySelector(".wpmresults-cont"),
    typing: document.querySelector(".typing-cont")
};

export function transition(curr, prev) {
    curr.style.display = "none";
    prev.style.display = "block";
}
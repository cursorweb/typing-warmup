// export const wpmResultsCont = document.querySelector(".wpmresults-cont");
// export const wpmResults = document.querySelector(".wpmresults");
// export const typingPageCont = document.querySelector(".typing-cont");

export const pages = {
    results: document.querySelector(".wpmresults-page") as HTMLDivElement,
    typing: document.querySelector(".typing-page") as HTMLDivElement
};

export function transition(curr: HTMLDivElement, prev: HTMLDivElement) {
    curr.style.display = "none";
    prev.style.display = "block";
}

export const resultsCont = document.querySelector(".wpmresults");
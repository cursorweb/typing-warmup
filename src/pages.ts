// export const wpmResultsCont = document.querySelector(".wpmresults-cont");
// export const wpmResults = document.querySelector(".wpmresults");
// export const typingPageCont = document.querySelector(".typing-cont");

export const pages: Record<string, HTMLDivElement> = {
    results: document.querySelector(".wpmresults-page"),
    typing: document.querySelector(".typing-page")
};

export function transition(curr: HTMLDivElement, prev: HTMLDivElement) {
    curr.style.display = "none";
    prev.style.display = "block";
}

export const resultsCont = document.querySelector(".wpmresults");
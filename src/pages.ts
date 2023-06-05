// todo: els obj?
export const resultsCont = document.querySelector(".wpmresults");

export const pages = {
    results: document.querySelector(".wpmresults-page") as HTMLDivElement,
    typing: document.querySelector(".typing-page") as HTMLDivElement
};

let currPage: HTMLDivElement = pages.typing;

export function transition(page: HTMLDivElement) {
    currPage.style.display = "none";
    currPage = page;
    currPage.style.display = "block";
}
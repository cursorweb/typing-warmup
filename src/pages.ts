// todo: els obj?
export const resultsCont = document.querySelector(".wpmresults");

export const pages = {
    results: document.querySelector(".wpmresults-page") as HTMLDivElement,
    typing: document.querySelector(".typing-page") as HTMLDivElement,
    select: document.querySelector(".warmup-select") as HTMLDivElement
};

let currPage: HTMLDivElement = pages.select;

export function transition(page: HTMLDivElement) {
    currPage.classList.add("hide");
    currPage = page;
    currPage.classList.remove("hide");
}
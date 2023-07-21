import styles from "./Test.module.css";
import { Char } from "./Char";
import React from "react";

/**
 * @deprecated
 */
export function Word({ children, hasSpace: space, isCurr, cIdx }: { children: React.JSX.Element[], hasSpace: boolean, isCurr: boolean, cIdx: number }) {
    const wordLength = children.length;
    let comp: React.JSX.Element | null = null;

    if (space) {
        if (cIdx > wordLength && isCurr) {
            comp = <Char char=" " state="wrong" />;
        } else if (cIdx == wordLength && isCurr) {
            comp = <Char char=" " state="curr" />;
        } else {
            comp = <Char char=" " />;
        }
    }

    return (
        <div className={styles.word}>
            {children}
            {comp}
        </div>
    );
}

export * from "./Char";
export * from "./testHook";
export * from "./wpm";
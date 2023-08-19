import styles from "./TestCont.module.css";
import React from "react";
import { RestartButton } from "./ResultsCont";

export function TestCont({ restart, children, isTyping }: { restart: () => void, isTyping: boolean } & React.PropsWithChildren) {
    return (
        <div>
            {isTyping
                ? <div>
                    <div className={styles.testCont}>{children}</div>
                    <RestartButton onClick={restart} />
                </div>
                : children}
        </div>
    );
}

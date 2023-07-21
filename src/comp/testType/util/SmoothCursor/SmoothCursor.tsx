import styles from "./SmoothCursor.module.css";
import { PropsWithChildren, useMemo, useRef } from "react";

export function SmoothCursor({ children, idx }: { idx: number } & PropsWithChildren) {
    const spanContRef = useRef<HTMLDivElement>(null);
    
    const pos = useMemo(() => {
        if (spanContRef.current) {
            const span = spanContRef.current.children[idx] as HTMLSpanElement;
            // todo:
            if (!span) return { left: 0, top: 0 };
            const left = span.offsetLeft;
            const top = span.offsetTop;
            return { left, top };
        }
        return { left: 0, top: 0 };
    }, [idx]);
    
    return <div className={styles.cont}>
        <div ref={spanContRef}>
            {children}
        </div>

        <span className={styles.caret} style={{ ...pos }} />
    </div>;
}
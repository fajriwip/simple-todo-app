import { useEffect, useRef } from "react";

export default function useFocus() {
    const htmlElRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        htmlElRef.current?.focus();
    }, [])

    return htmlElRef
}
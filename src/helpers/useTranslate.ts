import { useAppStore } from "@/context/appContext";
import { useState } from "react";
import translate from "translate";

export function useTranslate(text: string, from='es') {
    const { lang } = useAppStore((s) => s.ui);

    const [result, setResult] = useState("")
    translate.engine = "google";
    translate(text, { from: from, to: lang }).then((res) => {
        setResult(res)
    })

    return result
}
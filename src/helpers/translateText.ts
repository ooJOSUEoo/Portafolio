import { useAppStore as appStore } from "@/context/appContext";
import { useState } from "react";
import translate from "translate";

export async function translateText(text: string, from='es') {
    const app = appStore.getState();
    const { lang } = app.ui

    translate.engine = "google";
    return await translate(text, { from: from, to: lang })
}

export function useTranslateText(text: string, from='es') {

    const [resp, setResp] = useState('')
    const app = appStore.getState();
    const { lang } = app.ui

    translate.engine = "google";
    translate(text, { from: from, to: lang }).then((res) => {
        setResp(res)
    })

    return resp
}
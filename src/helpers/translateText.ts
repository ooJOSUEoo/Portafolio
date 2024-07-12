import { useAppStore as appStore } from "@/context/appContext";
import { useState } from "react";
import translate from "translate";

export async function translateText(text: string, from='en') {
    const app = appStore.getState();
    const { lang } = app.ui

    translate.engine = "google";
    const resp = await translate(text, { from: from, to: lang })
    if (text === text.toUpperCase()) {
        return resp.toUpperCase();
    } else if (text === text.toLowerCase()) {
        return resp.toLowerCase();
    } else if (text[0] === text[0].toUpperCase() && text.slice(1) === text.slice(1).toLowerCase()) {
        return resp.slice(0, 1).toUpperCase() + resp.slice(1).toLowerCase();
    } else {
        return resp;
    }
}

export function useTranslateText(text: string, from='en') {

    const [resp, setResp] = useState('')
    const app = appStore.getState();
    const { lang } = app.ui

    translate.engine = "google";
    translate(text, { from: from, to: lang }).then((res) => {
        setResp(res)
    })
    if (text === text.toUpperCase()) {
        return resp.toUpperCase();
    } else if (text === text.toLowerCase()) {
        return resp.toLowerCase();
    } else if (text[0] === text[0].toUpperCase() && text.slice(1) === text.slice(1).toLowerCase()) {
        return resp.slice(0, 1).toUpperCase() + resp.slice(1).toLowerCase();
    } else {
        return resp;
    }
}
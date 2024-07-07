'use client'
import { useAppStore } from '@/context/appContext';
import React, { useEffect, useState } from 'react'
import translate from "translate";

/**
 * A function that translates text 
 */
export default  function TC({
    children,
  }: Readonly<{
    children: string;
  }>) {

    const { lang } = useAppStore((s) => s.ui);

    const [result, setResult] = useState("second")

    useEffect(() => {
        translate.engine = "google";
        translate(children, { from: "es", to: lang }).then((res) => {
            setResult(res)
        })
    }, [children, lang])
  return (
    <>{result}</>
  )
}

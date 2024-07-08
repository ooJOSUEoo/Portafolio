'use client'
import { useAppStore } from '@/context/appContext';
import React, { useEffect, useState } from 'react'
import translate from "translate";

/**
 * A function that translates text 
 */
export default  function TC({
    children,
    from="es",
  }: Readonly<{
    children: string;
    from?: string;
  }>) {
    const { lang } = useAppStore((s) => s.ui);

    const [result, setResult] = useState("")

    useEffect(() => {
        translate.engine = "google";
        translate(children, { from: from, to: lang }).then((res) => {
            setResult(res)
        })
    }, [children, from, lang])
  return (
    <>{result}</>
  )
}

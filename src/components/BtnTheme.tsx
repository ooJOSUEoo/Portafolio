'use client'
import { useAppStore } from '@/context/appContext'
import React, { useState } from 'react'

export default function BtnTheme() {

    const setTeme = useAppStore((s) => s.setTheme)
    const {theme} = useAppStore((s) => s.ui)

    const handleClick = () => {
        console.log(theme)
        if (theme === '') {
            setTeme('dark')
        } else {
            setTeme('')
        }
    }

  return (
    <button className='btn-theme' onClick={handleClick}>o</button>
  )
}

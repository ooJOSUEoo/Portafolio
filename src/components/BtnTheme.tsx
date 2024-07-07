'use client'
import { useAppStore } from '@/context/appContext'
import React, { useState } from 'react'

export default function BtnTheme() {

    const setTeme = useAppStore((s) => s.setTheme)
    const {theme} = useAppStore((s) => s.ui)

    const handleClick = () => {
        if (theme === '') {
            setTeme('dark')
        } else {
            setTeme('')
        }
    }

  return (
    <button className={`w-20 h-6 m-3 bg-[var(--secondary-color)] rounded-lg flex items-center px-2 
    ${theme === '' ? 'justify-start' : 'justify-end'}`} onClick={handleClick}>
        {
            theme === '' ? (
                <i className="fa-solid fa-sun text-[var(--background-color)]"></i>
            ) : (
                <i className="fa-solid fa-moon text-[var(--background-color)]"></i>
            )
        }
    </button>
  )
}

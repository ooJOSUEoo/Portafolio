'use client'
import { useAppStore } from '@/context/appContext';
import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function SelectTranslate() {

  const {lang} = useAppStore((s) => s.ui)
  const setLang = useAppStore((s) => s.setLang)

  const options = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'it', label: 'Italiano' },
    { value: 'de', label: 'Deutsch' },
    { value: 'ja', label: '日本語' },
    { value: 'ko', label: '한국어' },
    { value: 'ru', label: 'Русский' },
    { value: 'zh', label: '简体中文' }
  ]

  return (
    <Select 
    styles={{
      control: (styles: any) => ({ ...styles, backgroundColor: 'var(--header-color)' }),
      menu: (styles: any) => ({ ...styles, backgroundColor: 'var(--header-color)', zIndex: 9999 }),
      option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => ({
        ...styles,
        ":hover": {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        },
        backgroundColor: isDisabled
          ? null
          : isSelected
            ? 'var(--alternate-color)'
            : isFocused
              ? 'var(--header-color)'
              : null,
        color: isDisabled
          ? '#ccc'
          : isSelected
            ? 'var(--secondary-color)'
            : isFocused
              ? 'var(--secondary-color)'
              : 'var(--secondary-color)'
      }),
      singleValue: (styles: any) => ({ ...styles, color: 'var(--secondary-color)' }),
      placeholder: (styles: any) => ({ ...styles, color: 'var(--secondary-color)' }),
      valueContainer: (styles: any) => ({ ...styles, color: 'var(--secondary-color)' }),
      input: (styles: any) => ({ ...styles, color: 'var(--secondary-color)' }),
      
    }}
    isSearchable={true}
    onChange={({ value }: any) => setLang(value)}
    defaultValue={options.find((o) => o.value === lang)}
    components={animatedComponents}
    options={options} />
  )
}

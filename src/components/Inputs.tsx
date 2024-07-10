'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react'
import { decodeBase64ToFile } from '@/helpers/fileB64';

export function InputsTexts({ 
    label, name, placeholder, type="text", component, value,
    errors, touched, TC, Field, SetFieldValue, className="", ...props }:any) {
    useEffect(() => {
      if(value?.length) {
        SetFieldValue(name, value)
      }
    }, [SetFieldValue, name, value])

  return (
    <div className="">
        <p className='text-[var(--secondary-color)] font-semibold'><TC>{label}</TC></p>
        <Field 

        className={`w-full py-2 px-2 border rounded-xl my-2 
        hover:border-slate-600 bg-[var(--background-color)] text-[var(--secondary-color)]
        ${errors[`${name}`] && touched[`${name}`] ? 'border-[var(--error-color)]' : 'border-[var(--success-color)]'} 
        ${className}`}
        type={type} component={component} name={name} id={name} placeholder={placeholder}
        {...props}/>
        {errors[`${name}`] && touched[`${name}`] ? (
        <div className='text-[var(--error-color)]'><TC>{errors[`${name}`]}</TC></div>
        ) : null}
    </div>
  )
}

export function InputsFile({
    label, name, accept="", value='', isMultiple=false,
    errors, touched, TC, Field, SetFieldValue, values,
    deleteFile=false, className="", ...props
  }: any) {
      const [ico, setIco] = useState("fa-upload");
      const [url, setUrl] = useState(value || '');
      const [nameFile, setNameFile] = useState('')
  
      useEffect(() => {
          if (value) {
            const inputFile = document.getElementById(name) as HTMLInputElement | null;
            if (inputFile) {
                setTimeout(() => {
                    SetFieldValue(name, value);
                    setUrl(value);
                    setNameFile(label+'.'+value.split('?')[0].split('.').pop())
                }, 100);
            }
          }
      }, [SetFieldValue, label, name, value]);
  
      const handleFileChange = (e: any) => {
          const file = e.target.files[0];
          if (file) {
              SetFieldValue(name, file);
              setUrl(URL.createObjectURL(file));
              setNameFile(file.name)
          }
      };
  
      const handleDrop = (e: any) => {
          e.preventDefault();
          const data = e.dataTransfer.files;
          const inputFile = document.getElementById(name) as HTMLInputElement | null;
          if (inputFile && data.length > 0) {
              inputFile.files = data;
              handleFileChange({ target: { files: data } });
          }
          setIco("fa-upload");
      };
  
      const handleDeleteFile = (e: any) => {
          e.stopPropagation();
          const inputFile = document.getElementById(name) as HTMLInputElement | null;
          if (inputFile) {
              inputFile.value = '';
              inputFile.files = null;
          }
          SetFieldValue(name, null);
          setUrl('');
      };
      return (
        <div className="">
          <p className='text-[var(--secondary-color)] font-semibold'><TC>{label}</TC></p>
          <div 
            onClick={() => document.getElementById(name)?.click()}
            onDragOver={(e: any) => {
              e.preventDefault();
              setIco("fa-check");
            }}
            onDragLeave={(e: any) => {
              e.preventDefault();
              setIco("fa-upload");
            }}
            onDrop={handleDrop}
            className={`w-full h-40 cursor-pointer overflow-hidden
            bg-[rgba(0,0,0,0.2)] relative border
            ${errors[`${name}`] ? 'border-[var(--error-color)]' : 'border-[var(--success-color)]'}`}>
              {url ? (
                  nameFile.match(/(png|jpg|jpeg|gif)/) ? (
                      <div className="absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 flex items-center gap-1">
                          <Image
                              onClick={() => document.getElementById(name)?.click()}
                              src={url}
                              alt={url.split('/').pop() || 'file'}
                              width={150} height={150} className='object-contain' />
                          <p className='text-[var(--secondary-color)] sm:text-2xl'>{nameFile}</p>
                      </div>
                  ) : (
                      <>
                          <i
                              onClick={() => document.getElementById(name)?.click()}
                              className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 fa fa-file text-[var(--secondary-color)] text-5xl p-3'></i>
                          <p className='absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--secondary-color)] text-2xl'>{nameFile}</p>
                      </>
                  )
              ) : (
                  <i
                      onClick={() => document.getElementById(name)?.click()}
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fa ${ico} text-[var(--secondary-color)] text-5xl border rounded-full p-3`}></i>
              )}
              {deleteFile && url && (
                  <i 
                      onClick={(e) => {
                        handleDeleteFile(e);
                        value = '1';
                      }}
                      className='absolute top-1 right-0 -translate-x-1/2 fa fa-trash
                       text-[var(--error-color)] text-5xl-3 ml-2 p-1 hover:rounded-md hover:border hover border-[var(--error-color)]'></i>
              )}
          </div>
          {url && (
              <Link target='_blank' href={url} className='text-[var(--success-color)]'><TC>Open File</TC></Link>
          )}
          <input type="file" id={name} name={name} accept={accept} className="hidden" multiple={isMultiple}
              onChange={handleFileChange} />
          {errors[`${name}`] ? (
              <div className='text-[var(--error-color)]'><TC>{errors[`${name}`]}</TC></div>
          ) : null}
      </div>
    );
  }

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'


/**
 * Renders a text input field 
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the input field. - Required.
 * @param {string} props.name - The name of the input field. - Required.
 * @param {string} [props.placeholder] - The placeholder text for the input field.
 * @param {string} [props.type="text"] - The type of the input field.
 * @param {React.ElementType} [props.component] - The custom component to render as the input field.
 * @param {Object} [props.errors] - The object containing validation errors.
 * @param {Object} [props.touched] - The object containing touched status of each field.
 * @param {Function} props.TC - The translation function. - Required.
 * @param {React.ElementType} props.Field - The custom Field component. - Required.
 * @param {Function} [props.SetFieldValue] - The function to set the value of the input field.
 * @param {string} [props.className=""] - The additional CSS class for the input field.
 * @return {JSX.Element} The rendered text input field.
 */
export function InputsTexts({ 
    label, name, placeholder, type="text", component,
    errors, touched, TC, Field, SetFieldValue, className="", ...props }:any) {
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

/**
 * Renders a file input field with customizable options.
 *
 * @param {string} label - The label for the file input field. - Required.
 * @param {string} name - The name of the file input field. - Required.
 * @param {string} [accept=""] - The accepted file types for the file input field.
 * @param {Object} errors - The object containing validation errors.
 * @param {Object} touched - The object containing touched status of each field.
 * @param {Function} TC - The translation function. - Required.
 * @param {React.ElementType} Field - The custom Field component. - Required.
 * @param {Function} [SetFieldValue] - The function to set the value of the file input field.
 * @param {Boolean} [deleteFile=false] - The function to delete the uploaded file.
 * @param {string} [className=""] - The additional CSS class for the file input field.
 * @param {...any} props - Additional props for customization.
 * @return {JSX.Element} The rendered file input field.
 */

export function InputsFile({
  label, name, accept="",
  errors, touched, TC, Field, SetFieldValue, deleteFile=false, className="", ...props
}:any) {
    const [ico, setIco] = useState("fa-upload")
  return (
    <div className="">
        <p className='text-[var(--secondary-color)] font-semibold'><TC>{label}</TC></p>
        <div 
        onClick={(e:any) => document.getElementById(name)?.click()}
        onDragOver={(e:any) => {
            e.preventDefault();
            setIco("fa-check");
        }}
        onDragLeave={(e:any) => {
            e.preventDefault();
            setIco("fa-upload");
        }}
        onDrop={(e:any) => {
            e.preventDefault();
            const data = e.dataTransfer.files;
            const inputFile = document.getElementById(name) as HTMLInputElement | null;
            if(inputFile && data.length > 0){
                inputFile.files = data
                const changeEvent = new Event('change', { bubbles: true });
                inputFile.dispatchEvent(changeEvent);
            }
            setIco("fa-upload");
        }}
        className={`w-full h-40 cursor-pointer overflow-hidden
        bg-[rgba(0,0,0,0.2)] relative border
        ${errors[`${name}`] ? 'border-[var(--error-color)]' : 'border-[var(--success-color)]'}`}>
            {
            (() => {
                const inputFile = document.getElementById(name) as HTMLInputElement | null;
                if (inputFile && inputFile.files && inputFile.files[0]) {
                    const extension = inputFile?.files?.[0]?.name.split('.').pop();
                    if(extension == 'png' || extension == 'jpg' || extension == 'jpeg' || extension == 'gif'){
                        return (
                            <div className="absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 
                            
                            flex items-center gap-1">
                                <Image
                                onClick={(e:any) => document.getElementById(name)?.click()}
                                src={URL.createObjectURL(inputFile?.files?.[0])}
                                alt={inputFile?.files?.[0]?.name}
                                width={150} height={150} className='object-contain'/>
                                <p className='text-[var(--secondary-color)] sm:text-2xl'>{inputFile?.files?.[0]?.name}</p>
                            </div>
                        )
                    }
                    return (
                        <>
                            <i
                            onClick={(e:any) => document.getElementById(name)?.click()}
                            className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                            fa fa-file text-[var(--secondary-color)] text-5xl p-3'></i>
                            <p className='absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                            text-[var(--secondary-color)] text-2xl'>{inputFile?.files?.[0]?.name}</p>
                        </>
                    )
                }else{
                    return (
                        <i
                        onClick={(e:any) => document.getElementById(name)?.click()}
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        fa ${ico} text-[var(--secondary-color)] text-5xl border rounded-full p-3`}></i>
                    ); 
                }
            })()
            }
            {
            (() => {
                const inputFile = document.getElementById(name) as HTMLInputElement | null;
                if (inputFile && inputFile.files && inputFile.files[0] && deleteFile) {
                    return (
                        <i 
                        onClick={(e:any) => {
                            e.stopPropagation();
                            inputFile.value = '';
                            inputFile.files = null;
                            SetFieldValue(name, null);
                        }}
                        className='absolute top-1 right-0 -translate-x-1/2 fa fa-trash 
                        text-[var(--error-color)] text-5xl-3 ml-2'></i>
                    );
                }
                return null;
            })()
            }
        </div>
        {
            (() => {
                const inputFile = document.getElementById(name) as HTMLInputElement | null;
                if (inputFile && inputFile.files && inputFile.files[0]) {
                    const link = URL.createObjectURL(inputFile?.files?.[0]);
                    return (
                        <Link target='_blank' href={link} className='text-[var(--success-color)]'><TC>Abrir archivo</TC></Link>
                    );
                }
                return null;
            })()
        }
        <Field type="file" name={name} id={name} className="hidden" accept={accept} />
        {errors[`${name}`] ? (
        <div className='text-[var(--error-color)]'><TC>{errors[`${name}`]}</TC></div>
        ) : null}
    </div>
  )
}

'use client'
import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TC from '@/components/TranslateContent';
import { InputsFile, InputsTexts } from '@/components/Inputs';
import { useAppStore } from '@/context/appContext';
import { v4 as uuidv4 } from 'uuid';


export default function SkillsAddAdminPage() {
  const setSkill = useAppStore((s) => s.setSkill)
  const SkillsSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    image: Yup.mixed().required("Ingresa una fotografia"),
  });
  return (
    <div>
      <Formik initialValues={{
        name: "",
        image: "",
       }}
       validationSchema={SkillsSchema}
       onSubmit={async(values) => {
        setSkill({
          id: uuidv4(),
          name: values.name,
          image: values.image,
          createAt: null,
          updatedAt: null,
        })
       }}
       >
        {({ errors, touched, setFieldValue }) => (
          <Form className='mx-10'>
            <div className="flex justify-between">
              <p className='text-3xl text-[var(--secondary-color)] font-semibold'><TC>Habilidades</TC></p>
            </div>

            <InputsTexts type='text' name='name' label='Nombre' placeholder='...' Field={Field}
            TC={TC} errors={errors} touched={touched}   />

            <InputsFile name='image' label='Imagen' Field={Field} TC={TC} errors={errors} 
            touched={touched} accept='image/*' SetFieldValue={setFieldValue} deleteFile={true} />
            <div className="">
              <input 
              className='w-full cursor-pointer py-2 px-2 my-2 border border-transparent
              hover:border-[var(--secondary-color)] bg-[var(--background-color)] text-[var(--secondary-color)]
              transition ease-in-out'
              type="submit" value="Guardar" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

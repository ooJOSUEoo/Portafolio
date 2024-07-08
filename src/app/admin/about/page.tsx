'use client'
import React from 'react'
import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import TC from '@/components/TranslateContent';
import { InputsFile, InputsTexts } from '@/components/Inputs';

export default function AboutAdminPage() {

  const AboutSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    description: Yup.string().required('La descripción es requerida'),
    cv: Yup.mixed().required("Ingresa un CV"),
    image: Yup.mixed().required("Ingresa una fotografia"),
  });
  return (
    <div>
      <Formik initialValues={{
        name: "",
        description: "",
        cv: "",
        image: "",
       }}
       validationSchema={AboutSchema}
       onSubmit={async(values) => {
        console.log(values)
       }}
       >
        {({ errors, touched, setFieldValue }) => (
          <Form className='mx-10'>
            <div className="flex justify-between">
              <p className='text-3xl text-[var(--secondary-color)] font-semibold'><TC>Acerca de</TC></p>
            </div>

            <InputsTexts type='text' name='name' label='Nombre' placeholder='John Doe' Field={Field}
            TC={TC} errors={errors} touched={touched}   />

            <InputsTexts component='textarea' rows={5} name='description' label='Descripción' placeholder='John Doe' Field={Field}
            TC={TC} errors={errors} touched={touched}  />

            <InputsFile name='cv' label='CV' Field={Field} TC={TC} errors={errors} 
            touched={touched} accept='application/pdf' SetFieldValue={setFieldValue} deleteFile={true} />

            <InputsFile name='image' label='Imagen' Field={Field} TC={TC} errors={errors} 
            touched={touched} accept='image/*' SetFieldValue={setFieldValue} deleteFile={true} />
            <div className="">
              <input 
              className='w-full cursor-pointer py-2 px-2 my-2 border border-transparent
              hover:border-[var(--secondary-color)] bg-[var(--background-color)] text-[var(--secondary-color)]
              transition ease-in-out'
              type="submit" value="Login" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

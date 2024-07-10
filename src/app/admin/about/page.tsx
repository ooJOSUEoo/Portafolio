'use client'
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, setIn } from 'formik';
import * as Yup from 'yup';
import {TC} from '@/components/TranslateContent';
import { InputsFile, InputsTexts } from '@/components/Inputs';
import { useAppStore } from '@/context/appContext';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';
import { translateText, useTranslateText } from '@/helpers/translateText';

export default function AboutAdminPage() {
  
  const {data: session}:any = useSession()

  const {name, description, cv, image} = useAppStore((s) => s.about)
  
  const setAbout = useAppStore((s) => s.setAbout)
  const getAbout = useAppStore((s) => s.getAbout)

  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    cv: '',
    image: ''
  });

  const labels={
    name: useTranslateText('Name'),
    description: useTranslateText('Description'),
    cv: useTranslateText('Curriculum vitae'),
    image: useTranslateText('Image'),
  }
  

  const AboutSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    cv: Yup.mixed().required("Curriculum vitae is required"),
    image: Yup.mixed().required("Image is required"),
  });

  useEffect(() => {
    const gA = async () => {
      const resp =await getAbout(session.user.accessToken)
      if(resp) {
        setInitialValues({
          name: resp.name,
          description: resp.description,
          cv: resp.cv,
          image: resp.image
        })
      }
    }

    gA()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAbout, name, session.user.accessToken])

  return (
    <div>
      <Formik initialValues={initialValues}
       validationSchema={AboutSchema}
       onSubmit={async(values) => {
        console.log(values)
        await setAbout({
          id: "abc",
          name: values.name,
          description: values.description,
          cv: values.cv,
          image: values.image,
        },session.user.accessToken)
       }}
       >
        {({ errors, touched, setFieldValue, values }) =>{ 
          return(
          <Form className='mx-10 mb-3'>
            <div className="flex justify-between">
              <p className='text-3xl text-[var(--secondary-color)] font-semibold'><TC>About</TC></p>
            </div>

            <InputsTexts type='text' name='name' label={labels.name} placeholder='John Doe' value={name}
            Field={Field} TC={TC} errors={errors} touched={touched} SetFieldValue={setFieldValue}   />

            <InputsTexts component='textarea' rows={5} name='description' label={labels.description} value={description}
            placeholder='...' Field={Field} TC={TC} errors={errors} touched={touched} SetFieldValue={setFieldValue}  />

            <InputsFile name='cv' label={labels.cv} Field={Field} TC={TC} errors={errors} value={cv} 
            touched={touched} accept='application/pdf' SetFieldValue={setFieldValue} values={values} deleteFile={true} />

            <InputsFile name='image' label={labels.image} Field={Field} TC={TC} errors={errors} value={image}
            touched={touched} accept='image/*' SetFieldValue={setFieldValue} values={values} deleteFile={true} />
            <div className="">
              <input 
              className='w-full cursor-pointer py-2 px-2 my-2  border-b-2 border-[var(--secondary-color)]
              hover:border hover:border-[var(--secondary-color)] bg-[var(--background-color)] text-[var(--secondary-color)]
              transition ease-in-out'
              type="submit" value="Guardar" />
            </div>
          </Form>
        )} }
      </Formik>
    </div>
  )
}

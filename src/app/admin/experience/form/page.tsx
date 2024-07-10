'use client'
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {TC} from '@/components/TranslateContent';
import { InputsFile, InputsTexts } from '@/components/Inputs';
import { useAppStore } from '@/context/appContext';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';



export default function SkillsAddAdminPage() {

  const {data: session}:any = useSession()
  const searchParams = useSearchParams()
  const router = useRouter()

  const {name, description, image, url} = useAppStore((s) => s.experiences.experience)

  const setExperience = useAppStore((s) => s.setExperience)
  const getExperience = useAppStore((s) => s.getExperience)
  const updateExperience = useAppStore((s) => s.updateExperience)

  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    image: '',
    url: '',
  });
  const [id, setId] = useState('')
  
  const ExperienceSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    url: Yup.string(),
    image: Yup.mixed(),
  });

  useEffect(() => {
    const id = searchParams.get('id')
    if(id){
      setId(id)
      const gS = async() => {
        const resp = await getExperience(id, session.user.accessToken)
        if(resp) {
          setInitialValues({
            name: resp.name,
            description: resp.description,
            image: resp.image ?? '',
            url: resp.url ?? '',
          })
        }else{
          router.push('/admin/experience')
        }
      }
      gS()
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [getExperience, searchParams, session.user.accessToken])
  return (
    <div>
      <Formik initialValues={initialValues}
       validationSchema={ExperienceSchema}
       onSubmit={async(values) => {
        if(id){
          const resp = await updateExperience({
            name: values.name,
            description: values.description,
            image: values.image,
            url: values.url
          },id, session.user.accessToken)

          if(resp) {
            router.push('/admin/experience')
          }
        }else{
          const resp = await setExperience({
            id: uuidv4(),
            name: values.name,
            description: values.description,
            image: values.image,
            url: values.url
          }, session.user.accessToken)
  
          if(resp) {
            router.push('/admin/skills')
          }
        }
       }}
       >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className='mx-10'>
            <div className="flex justify-between">
              <p className='text-3xl text-[var(--secondary-color)] font-semibold'><TC>Experiencia</TC></p>
            </div>

            <InputsTexts type='text' name='name' label='Nombre' placeholder='John Doe' value={id ? name : ''}
            Field={Field} TC={TC} errors={errors} touched={touched} SetFieldValue={setFieldValue}   />

            <InputsFile name='image' label='Imagen' Field={Field} TC={TC} errors={errors} value={id ? image : ''}
            touched={touched} accept='image/*' SetFieldValue={setFieldValue} values={values} deleteFile={true} />
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

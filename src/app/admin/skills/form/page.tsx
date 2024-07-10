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
import { useTranslateText } from '@/helpers/translateText';



export default function SkillsAddAdminPage() {

  const {data: session}:any = useSession()
  const searchParams = useSearchParams()
  const router = useRouter()

  const {name, image} = useAppStore((s) => s.skills.skill)

  const setSkill = useAppStore((s) => s.setSkill)
  const getSkill = useAppStore((s) => s.getSkill)
  const updateSkill = useAppStore((s) => s.updateSkill)

  const [initialValues, setInitialValues] = useState({
    name: '',
    image: ''
  });
  const [id, setId] = useState('')
  
  const SkillsSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    image: Yup.mixed().required("Image is required"),
  });
  const labels={
    name: useTranslateText('Name'),
    image: useTranslateText('Image'),
  }

  useEffect(() => {
    const id = searchParams.get('id')
    if(id){
      setId(id)
      const gS = async() => {
        const resp = await getSkill(id, session.user.accessToken)
        if(resp) {
          setInitialValues({
            name: resp.name,
            image: resp.image
          })
        }else{
          router.push('/admin/skills')
        }
      }
      gS()
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [getSkill, searchParams, session.user.accessToken])
  return (
    <div>
      <Formik initialValues={initialValues}
       validationSchema={SkillsSchema}
       onSubmit={async(values) => {
        if(id){
          const resp = await updateSkill({
            name: values.name,
            image: values.image,
          },id, session.user.accessToken)

          if(resp) {
            router.push('/admin/skills')
          }
        }else{
          const resp = await setSkill({
            id: uuidv4(),
            name: values.name,
            image: values.image,
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
              <p className='text-3xl text-[var(--secondary-color)] font-semibold'><TC>Skills</TC></p>
            </div>

            <InputsTexts type='text' name='name' label={labels.name} placeholder='...' value={id ? name : ''}
            Field={Field} TC={TC} errors={errors} touched={touched} SetFieldValue={setFieldValue}   />

            <InputsFile name='image' label={labels.image} Field={Field} TC={TC} errors={errors} value={id ? image : ''}
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

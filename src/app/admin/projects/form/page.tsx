'use client'
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {TC} from '@/components/TranslateContent';
import { InputsFile, InputsSelect, InputsTexts } from '@/components/Inputs';
import { useAppStore } from '@/context/appContext';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useTranslateText } from '@/helpers/translateText';



export default function ProjectAddAdminPage() {

  const {data: session}:any = useSession()
  const searchParams = useSearchParams()
  const router = useRouter()

  const {name, description, mainImage, images, url, github, company, initialDate, endDate, isFavourite, skills} = useAppStore((s) => s.projects.project)

  const setProject = useAppStore((s) => s.setProject)
  const getProject = useAppStore((s) => s.getProject)
  const updateProject = useAppStore((s) => s.updateProject)
  
  const getSkills = useAppStore((s) => s.getSkills)
  const skillsData = useAppStore((s) => s.skills.data)

  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    mainImage: '',
    images: '',
    url: '',
    github: '',
    company: '',
    initialDate: '',
    endDate: '',
    isFavourite: false,
    skills: '',
  });
  const [id, setId] = useState('')
  const [options, setOptions] = useState<any>([])
  
  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    mainImage: Yup.mixed().required('Image is required'),
    images: Yup.mixed().required("Images is required"),
    url: Yup.string().url("URL is not valid"),
    github: Yup.string().url("Github URL is not valid"),
    company: Yup.string().required('Company is required'),
    initialDate: Yup.string().required('Initial date is required'),
    endDate: Yup.string(),
    isFavourite: Yup.boolean(),
    skills: Yup.array().required("Skills are required").min(1, "At least one skill is required"),
  });

  const labels={
    name: useTranslateText('Name'),
    description: useTranslateText("Description"),
    mainImage: useTranslateText('Main image'),
    images: useTranslateText('Images'),
    url: useTranslateText('Url'),
    github: useTranslateText('Github'),
    company: useTranslateText('Company'),
    initialDate: useTranslateText('Initial date'),
    endDate: useTranslateText('End date'),
    isFavourite: useTranslateText('Is favourite'),
    skills: useTranslateText('Skills'),
  }

  useEffect(() => {
    const gS = async() => {
      await getSkills(session.user.accessToken)
    }
    gS()
    const o = skillsData.map((s:any) => {
      return {
        label: s.name,
        value: s.id
      }
    })
    setOptions(o)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const id = searchParams.get('id')
    if(id){
      setId(id)
      const gS = async() => {
        const resp = await getProject(id, session.user.accessToken)
        if(resp) {
          console.log(resp)
          setInitialValues({
            name: resp.name,
            description: resp.description,
            mainImage: resp.mainImage,
            images: resp.images,
            url: resp.url??"",
            github: resp.github??"",
            company: resp.company,
            initialDate: new Date(resp.initialDate).toISOString().substr(0, 10) as any,
            endDate: new Date(resp.endDate!).toISOString().substr(0, 10)??new Date() as any,
            isFavourite: resp.isFavourite??false,
            skills: resp.skills as any
          })
        }else{
          router.push('/admin/projects')
        }
      }
      gS()
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [getProject, searchParams, session.user.accessToken])
  return (
    <div>
      <Formik initialValues={initialValues}
       validationSchema={schema}
       onSubmit={async(values) => {
        console.log(values)
        if(id){
          const resp = await updateProject({
            name: values.name,
            description: values.description,
            mainImage: values.mainImage,
            images: values.images,
            url: values.url,
            github: values.github,
            company: values.company,
            initialDate: values.initialDate as any,
            endDate: values.endDate as any,
            isFavourite: values.isFavourite,
            skills: values.skills as any
          },id, session.user.accessToken)

          if(resp) {
            router.push('/admin/projects')
          }
        }else{
          const resp = await setProject({
            id: uuidv4(),
            name: values.name,
            description: values.description,
            mainImage: values.mainImage,
            images: values.images,
            url: values.url,
            github: values.github,
            company: values.company,
            initialDate: values.initialDate as any,
            endDate: values.endDate as any,
            isFavourite: values.isFavourite,
            skills: values.skills as any
          }, session.user.accessToken)
  
          if(resp) {
            router.push('/admin/projects')
          }
        }
       }}
       >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className='mx-10'>
            <div className="flex justify-between">
              <p className='text-3xl text-[var(--secondary-color)] font-semibold'><TC>Project</TC></p>
            </div>

            <InputsTexts type='text' name='name' label={labels.name} placeholder='...' value={id ? name : ''}
            Field={Field} TC={TC} errors={errors} touched={touched} SetFieldValue={setFieldValue}   />

            <InputsTexts type='text' name='description' component="textarea" rows={5} label={labels.description} placeholder='' value={id ? description : ''}
            Field={Field} TC={TC} errors={errors} touched={touched} SetFieldValue={setFieldValue}   />

            <InputsTexts type='text' name='url' label={labels.url} placeholder='http...' value={id ? url : ''}
            Field={Field} TC={TC} errors={errors} touched={touched} SetFieldValue={setFieldValue}   />

            <InputsTexts type='text' name='github' label={labels.github} placeholder='http...' value={id ? github : ''}
            Field={Field} TC={TC} errors={errors} touched={touched} SetFieldValue={setFieldValue}   />

            <InputsTexts type='text' name='company' label={labels.company} placeholder='...' value={id ? company : ''}
            Field={Field} TC={TC} errors={errors} touched={touched} SetFieldValue={setFieldValue}   />

            <InputsTexts type='date' name='initialDate' label={labels.initialDate} value={id ? new Date(initialDate).toISOString().substr(0, 10) : ''}
            Field={Field} TC={TC} errors={errors} touched={touched} SetFieldValue={setFieldValue}   />

            <InputsTexts type='date' name='endDate' label={labels.endDate} value={id ? endDate ? new Date(endDate).toISOString().substr(0, 10): '' : ''}
            Field={Field} TC={TC} errors={errors} touched={touched} SetFieldValue={setFieldValue}   />
            
            <InputsTexts type='checkbox' name='isFavourite' label={labels.isFavourite} value={id ? isFavourite : ''}
            Field={Field} TC={TC} errors={errors} touched={touched} SetFieldValue={setFieldValue}  
            className={`
              cursor-pointer
              h-7
            `} />

            <InputsFile name='mainImage' label={labels.mainImage} Field={Field} TC={TC} errors={errors} value={id ? mainImage : ''}
            touched={touched} accept='image/*' SetFieldValue={setFieldValue} values={values} deleteFile={true} />

            <InputsFile name='images' label={labels.images} Field={Field} TC={TC} errors={errors} value={id ? images : ''}
            touched={touched} accept='image/*' SetFieldValue={setFieldValue} values={values} deleteFile={true}
            isMultiple={true} />

            <InputsSelect name='skills' label={labels.skills} Field={Field} TC={TC} errors={errors} value={id ? skills.map((s: any) => s.id) : ''}
            touched={touched} SetFieldValue={setFieldValue} values={values} placeholder='...' isMultiple={true}
            options={options} />
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

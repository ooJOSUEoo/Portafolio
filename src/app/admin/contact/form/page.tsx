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



export default function ContacAddAdminPage() {

  const {data: session}:any = useSession()
  const searchParams = useSearchParams()
  const router = useRouter()

  const {name, icon, url} = useAppStore((s) => s.contacts.contact)

  const setContact = useAppStore((s) => s.setContact)
  const getContact = useAppStore((s) => s.getContact)
  const updateContact = useAppStore((s) => s.updateContact)

  const [initialValues, setInitialValues] = useState({
    name: '',
    icon: '',
    url: ''
  });
  const [id, setId] = useState('')
  
  const Schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    icon: Yup.string().required('Icon is required'),
    url: Yup.string().required('Url is required').url('Url is not valid'),
  });
  const labels={
    name: useTranslateText('Name'),
    icon: useTranslateText('Icon'),
    url: useTranslateText('Url'),
  }

  const options = [
    {value: 'fa fa-phone', label: <i className="fa fa-phone">  <TC>Phone</TC></i>},
    {value: 'fa fa-envelope', label: <i className="fa fa-envelope">  <TC>Email</TC></i>},
    {value: 'fa fa-globe', label: <i className="fa fa-globe">  <TC>Website</TC></i>},
    {value: 'fa fa-map-marker-alt', label: <i className="fa fa-map-marker-alt">  <TC>Location</TC></i>},
    {value: 'fa fa-link', label: <i className="fa fa-link">  <TC>Link</TC></i>},
    {value: 'fa-brands fa-whatsapp', label: <i className="fa-brands fa-whatsapp">  Whatsapp</i>},
    {value: 'fa-brands fa-github', label: <i className="fa-brands fa-github">  Github</i>},
    {value: 'fa-brands fa-linkedin', label: <i className="fa-brands fa-linkedin">  Linkedin</i>},
    {value: 'fa-brands fa-facebook', label: <i className="fa-brands fa-facebook">  Facebook</i>},
    {value: 'fa-brands fa-twitter', label: <i className="fa-brands fa-twitter">  Twitter</i>},
    {value: 'fa-brands fa-youtube', label: <i className="fa-brands fa-youtube">  Youtube</i>},
    {value: 'fa-brands fa-instagram', label: <i className="fa-brands fa-instagram">  Instagram</i>},
    {value: 'fa-brands fa-pinterest', label: <i className="fa-brands fa-pinterest">  Pinterest</i>},
    {value: 'fa-brands fa-snapchat', label: <i className="fa-brands fa-snapchat">  Snapchat</i>},
    {value: 'fa-brands fa-telegram', label: <i className="fa-brands fa-telegram">  Telegram</i>},
    {value: 'fa-brands fa-tiktok', label: <i className="fa-brands fa-tiktok">  Tiktok</i>},
    {value: 'fa-brands fa-reddit', label: <i className="fa-brands fa-reddit">  Reddit</i>},
    {value: 'fa-brands fa-paypal', label: <i className="fa-brands fa-paypal">  Paypal</i>},
    {value: 'fa-brands fa-twitch', label: <i className="fa-brands fa-twitch">  Twitch</i>},

  ]

  useEffect(() => {
    const id = searchParams.get('id')
    if(id){
      setId(id)
      const gC = async() => {
        const resp = await getContact(id, session.user.accessToken)
        if(resp) {
          setInitialValues({
            name: resp.name,
            icon: resp.icon,
            url: resp.url
          })
        }else{
          router.push('/admin/contact')
        }
      }
      gC()
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [getContact, searchParams, session.user.accessToken])
  return (
    <div>
      <Formik initialValues={initialValues}
       validationSchema={Schema}
       onSubmit={async(values) => {
        if(id){
          const resp = await updateContact({
            name: values.name,
            icon: values.icon,
            url: values.url
          },id, session.user.accessToken)

          if(resp) {
            router.push('/admin/contact')
          }
        }else{
          const resp = await setContact({
            id: uuidv4(),
            name: values.name,
            icon: values.icon,
            url: values.url
          }, session.user.accessToken)
  
          if(resp) {
            router.push('/admin/contact')
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
            
            <InputsTexts type='text' name='url' label={labels.url} placeholder='...' value={id ? url : ''}
            Field={Field} TC={TC} errors={errors} touched={touched} SetFieldValue={setFieldValue}   />

            <InputsSelect name='icon' label={labels.icon} Field={Field} TC={TC} errors={errors} value={icon}
            touched={touched} SetFieldValue={setFieldValue} values={values} placeholder='...'
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

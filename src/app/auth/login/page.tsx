'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import TC from '@/components/TranslateContent';
import { InputsTexts } from '@/components/Inputs';

export default function LoginPage() {
  const router = useRouter()

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('El email no es valido').required('El email es requerido'),
    password: Yup.string().required('La contraseña es requerida'),
  });

  return (
    <div className="w-screen h-screen bg-[var(--background-color)] flex justify-center items-center">
      <Formik initialValues={{
        email: '',
        password: '',
       }}
       validationSchema={LoginSchema}
       onSubmit={async(values) => {
        const resp = await signIn('credentials', {
          email: values.email, 
          password: values.password,
          redirect: true,
          callbackUrl: '/admin'
        });

        if(resp?.ok === false) {
          toast.error(resp.error)
        } else {
          // router.push('/admin') 
        }
       }}
       >
        {({ errors, touched }) => (
          <Form className='flex flex-col px-5 py-10 min-w-72 max-w-md w-2/3 h-2/3 rounded-xl bg-[var(--header-color)] justify-between'>
            <div className="flex justify-between">
              <i className="fa fa-angle-left cursor-pointer text-[var(--secondary-color)] text-3xl" onClick={() => {
                router.push('/')
              }}></i>
              <p className='text-3xl text-[var(--secondary-color)] font-semibold'><TC>Iniciar Sesion</TC></p>
            </div>
            
            <InputsTexts type='email' name='email' label='Correo electronico' placeholder='example@ex.com' 
            Field={Field} TC={TC} errors={errors} touched={touched}  />

            <InputsTexts type='password' name='password' label='Contraseña' placeholder='******' 
            Field={Field} TC={TC} errors={errors} touched={touched}  />

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

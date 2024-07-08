'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter()

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
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
              <i className="fa fa-angle-left cursor-pointer text-white text-3xl" onClick={() => {
                router.push('/')
              }}></i>
              <p className='text-3xl text-white font-semibold'>Login</p>
            </div>
            <div className="">
              <Field 
              className={`w-full py-2 px-2 border rounded-xl my-2 
              hover:border-slate-600 bg-[var(--background-color)] text-[var(--secondary-color)]
              ${errors.email && touched.email ? 'border-red-500' : 'border-lime-600'}`}
              type="text" name='email' id="email" placeholder="Email" />
              {errors.email && touched.email ? (
                <div className='text-red-500'>{errors.email}</div>
              ) : null}
            </div>
            <div className="">
              <Field  
              className={`w-full py-2 px-2 border rounded-xl my-2 
              hover:border-slate-600 bg-[var(--background-color)] text-[var(--secondary-color)]
              ${errors.password && touched.password ? 'border-red-500' : 'border-lime-600'}`}
              type="password" name='password' id="password" placeholder="Password" />
              {errors.password && touched.password ? (
                <div className='text-red-500'>{errors.password}</div>
              ) : null}
            </div>
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

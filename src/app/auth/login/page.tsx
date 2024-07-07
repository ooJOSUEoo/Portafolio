'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  return (
    <div className="w-screen h-screen bg-[var(--background-color)] flex justify-center items-center">
      <form className='flex flex-col px-5 py-10 min-w-72 max-w-md w-2/3 h-2/3 rounded-xl bg-[var(--header-color)] justify-between'>
        <div className="flex justify-between">
          <i className="fa fa-arrow-left cursor-pointer text-white text-3xl" onClick={() => {
            router.push('/')
          }}></i>
          <p className='text-3xl text-white font-semibold'>Login</p>
        </div>
        <div className="">
          <input 
          className='w-full py-2 px-2 border rounded-xl my-2 
          hover:border-slate-600 bg-[var(--background-color)] text-[var(--secondary-color)]'
          type="text" name='email' id="email" placeholder="Email" />
        </div>
        <div className="">
          <input 
          className='w-full py-2 px-2 border rounded-xl my-2 
          hover:border-slate-600 bg-[var(--background-color)] text-[var(--secondary-color)]'
          type="password" name='password' id="password" placeholder="Password" />
        </div>
        <div className="">
          <input 
          className='w-full cursor-pointer py-2 px-2 my-2 border border-transparent
          hover:border-[var(--secondary-color)] bg-[var(--background-color)] text-[var(--secondary-color)]
          transition ease-in-out'
          type="submit" value="Login" />
        </div>
      </form>
    </div>
  )
}

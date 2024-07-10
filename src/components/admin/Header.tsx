import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {TC} from '../TranslateContent'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useAppStore } from '@/context/appContext'

export default function HeaderAdmin() {
  
  const location = usePathname()

  const [showOptions, setShowOptions] = useState(false)
  const { data: session }:any = useSession();

  const logout = useAppStore((s) => s.logout)

  useEffect(() => {
    const section = location?.split('/')[2]
    if(section) {
      let list = document.querySelectorAll('.list');
      list.forEach(item => {
        item.classList.remove('border-b') 
      })
      document.getElementById(section)?.classList.add('border-b')
    }else{
      let list = document.querySelectorAll('.list');
      list.forEach(item => {
        item.classList.remove('border-b') 
      })
      document.getElementById('home')?.classList.add('border-b')
    }
  }, [location])

  useEffect(() => {
    document.body.addEventListener('click', (e:any) => {
      if(!e.target?.classList.contains('clickable')) setShowOptions(false)
    })
    return () => {
      document.body.removeEventListener('click', (e:any) => {
        if(!e.target?.classList.contains('clickable')) setShowOptions(false)
      })
    }
  }, [showOptions])

  const handleLogout = async() => {
    try {
      await logout()
      await signOut({callbackUrl: "/"}) 
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className='w-full bg-[var(--header-color)] py-4 mb-2'>
      <div className="px-5 flex justify-center items-center flex-wrap sm:justify-between">
        <div className="flex justify-center items-center flex-wrap gap-4">
          <i className='fa-solid fa-gear'></i>
          <Link className='list border-[var(--secondary-color)]' id='home' href='/admin'><TC>Dashboard</TC></Link>
          <Link className='list border-[var(--secondary-color)]' id='about' href='/admin/about'><TC>About</TC></Link>
          <Link className='list border-[var(--secondary-color)]' id='skills' href='/admin/skills'><TC>Skills</TC></Link>
          <Link className='list border-[var(--secondary-color)]' id='experience' href='/admin/experience'><TC>Experience</TC></Link>
          <Link className='list border-[var(--secondary-color)]' id='projects' href='/admin/projects'><TC>Projects</TC></Link>
          <Link className='list border-[var(--secondary-color)]' id='contact' href='/admin/contact'><TC>Contact</TC></Link>
          <Link className='' href='/'><TC>Start</TC></Link>
        </div>
        <div className="cursor-pointer" onClick={() => setShowOptions(!showOptions)}>
          <div className="flex justify-center items-center gap-1">
            <Image
              className='border border-gray-50 rounded-full w-10 h-10'
              src="/logo.png"
              alt="Picture"
              width={50}
              height={50}
            />
            <i className='fa fa-angle-down'></i>
          </div>
          <div className="relative">
            {
              showOptions &&
              <div className="w-40 absolute top-2 end-0 z-10 mr-8 bg-[var(--header-color)] border rounded-lg text-sm p-2" onClick={(e) => e.stopPropagation()}>
                <div className="flex text-center flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                  <Link 
                  className='hover:bg-[var(--alternate-color)] hover:transition-colors hover:text-white' 
                  href='/admin/profile'><TC>Profile</TC></Link>
                  <Link
                  className='hover:bg-[var(--alternate-color)] hover:transition-colors hover:text-white'
                  href='/admin/settings'><TC>Settings</TC></Link>
                  <p
                  onClick={handleLogout}
                  className='clickable hover:bg-[var(--alternate-color)] hover:transition-colors hover:text-white'
                  ><TC>Logout</TC></p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

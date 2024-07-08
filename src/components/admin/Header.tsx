import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import TC from '../TranslateContent'

export default function HeaderAdmin() {
  return (
    <nav className='w-full bg-[var(--header-color)] py-4 mb-2'>
      <div className="px-5 flex justify-center items-center flex-wrap sm:justify-between">
        <div className="flex justify-center items-center flex-wrap gap-4">
          <i className='fa-solid fa-gear'></i>
          <Link href='/admin'><TC>Tablero</TC></Link>
          <Link href='/admin/about'><TC>Acerca de</TC></Link>
          <Link href='/admin/skills'><TC>Habilidades</TC></Link>
          <Link href='/admin/experience'><TC>Experiencia</TC></Link>
          <Link href='/admin/projects'><TC>Proyectos</TC></Link>
          <Link href='/admin/contact'><TC>Contacto</TC></Link>
        </div>
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
      </div>
    </nav>
  )
}

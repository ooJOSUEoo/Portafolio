'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import '@/styles/header.css'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import TC from './TranslateContent'

export const Header = () => {
  // const { abouth } = useSelector(state => state.abouth)
  const location = usePathname()

  useEffect(() => {
    const section = location?.split('/')[1]
    if(section) {
      let list = document.querySelectorAll('.list');
      list.forEach(item => {
        item.classList.remove('active') 
      })
      document.getElementById(section)?.classList.add('active')
    }else{
      let list = document.querySelectorAll('.list');
      list.forEach(item => {
        item.classList.remove('active') 
      })
      document.getElementById('home')?.classList.add('active')
    }
  }, [location])

  const setActiveClass=({target}:any) => { 
      let list = document.querySelectorAll('.list');
      list.forEach(item => {
        item.classList.remove('active') 
      })
        target.tagName === 'LI' && target.classList.add('active')
        target.tagName === 'P' && target.parentNode.classList.add('active')
        target.tagName === 'SPAN' && target.parentNode.parentNode.classList.add('active')
        target.tagName === 'I' && target.parentNode.parentNode.parentNode.classList.add('active')
  }
  return (
    <nav className="xl:h-20 py-2 " id="header">{/*<--bg-dark*/}
        <div className="flex justify-around items-center flex-wrap gap-1"> {/*<--text-light*/}
            <div className="navbar-header flex items-center gap-2">
                <Image src={'https://avatars.githubusercontent.com/u/51724709?v=4'} className="border border-gray-50 rounded-full w-14 h-14" width={100} height={100} alt="mi foto" />
                <p className="navbar-brand font-bold mb-0">Josue Muñoz Avila</p>
            </div>
            <div className="navigation">
                <ul className=" ps-0 justify-center">
                    <Link href='/' className="list" id="home" onMouseOver={setActiveClass}>
                        <p>
                            <span className="icon"><i className="fa fa-home icons_header"></i></span>
                            <span className="text"><TC>Inicio</TC></span>
                        </p>
                    </Link>
                    <Link href='/experience' className="list" id="experience" onMouseOver={setActiveClass}>
                        <p>
                            <span className="icon"><i className="fa fa-file-certificate icons_header"></i></span>
                            <span className="text"><TC>Experiencia</TC></span>
                        </p>
                    </Link>
                    <Link href='/projects' className="list" id="projects" onMouseOver={setActiveClass}>
                        <p>
                            <span className="icon"><i className="fa fa-briefcase icons_header"></i></span>
                            <span className="text"><TC>Proyectos</TC></span>
                        </p>
                    </Link>
                    <Link href='/contact' className="list" id="contact" onMouseOver={setActiveClass}>
                        <p>
                            <span className="icon"><i className="fa fa-comments icons_header"></i></span>
                            <span className="text"><TC>Contacto</TC></span>
                        </p>
                    </Link>
                    <div className="indicator"></div>
                </ul>
            </div>
        </div>
    </nav>
  )
}

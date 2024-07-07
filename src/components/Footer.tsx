'use client'    
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import '@/styles/footer.css'
import waveD from '@/assets/img/waveD.png'
import waveL from '@/assets/img/waveL.png'
import Image from 'next/image';
import { useAppStore } from '@/context/appContext';
import TC from './TranslateContent';

export const Footer = () => {

    const {theme} = useAppStore((s) => s.ui)
    const [imageWave, setImageWave] = useState('')

    useEffect(() => {
      switch (theme) {
        case '':
          setImageWave(waveL.src)
          break;
        case 'dark':
          setImageWave(waveD.src)
          break;
        default:
          break;
      }
    }, [theme]);

  return (
    <footer className='' id="footer">
        <div className="waves">
            <div className={`wave`} id="wave1" style={{ backgroundImage: `url(${imageWave})` }}></div>
            <div className={`wave`} id="wave2" style={{ backgroundImage: `url(${imageWave})` }}></div>
            <div className={`wave`} id="wave3" style={{ backgroundImage: `url(${imageWave})` }}></div>
            <div className={`wave`} id="wave4" style={{ backgroundImage: `url(${imageWave})` }}></div>
            
        </div>

        <ul className="menu">
            <li><p>
                <TC>Gracias por visitar mi portafolio.</TC>
                <br />
                <br />
                <TC>Espero que hayas encontrado lo que buscabas.</TC>
                <br />
                </p></li>
        </ul>
        <p id="contacto"><TC>Todos los derechos reservados</TC></p>
        <p id="contacto">
          <i className="fa fa-copyright"></i>
          <span>&nbsp;</span>
          <span>2024</span>
        </p>

        <Link href='/admin'><TC>Soy admin</TC></Link>
    </footer>
  )
}
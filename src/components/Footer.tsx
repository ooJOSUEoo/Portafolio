'use client'    
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import '@/styles/footer.css'
import waveD from '@/assets/img/waveD.png'
import waveL from '@/assets/img/waveL.png'
import Image from 'next/image';

export const Footer = () => {

    const isDarkMode = false
    const [imageWave, setImageWave] = useState('')

    useEffect(() => {
        isDarkMode
        ? setImageWave(waveD.src)
        : setImageWave(waveL.src)
    }, [isDarkMode]);

  return (
    <footer className={`${isDarkMode ? 'dark' : 'light'}`} id="footer">
        <div className="waves">
            <div className={`wave`} id="wave1" style={{ backgroundImage: `url(${imageWave})` }}></div>
            <div className={`wave`} id="wave2" style={{ backgroundImage: `url(${imageWave})` }}></div>
            <div className={`wave`} id="wave3" style={{ backgroundImage: `url(${imageWave})` }}></div>
            <div className={`wave`} id="wave4" style={{ backgroundImage: `url(${imageWave})` }}></div>
            
        </div>

        <ul className="menu">
            <li><p>
                Gracias por visitar mi portafolio.
                <br />
                <br />
                Espero que hayas encontrado lo que buscabas.
                <br />
                </p></li>
        </ul>
        <p id="contacto">Todos los derechos reservados</p>
        <p id="contacto">
          <i className="fa fa-copyright"></i>
          <span>&nbsp;</span>
          <span>2024</span>
        </p>

        <Link href='/admin'>Soy admin</Link>
    </footer>
  )
}

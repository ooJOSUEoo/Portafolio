import React from 'react'
import { Link } from 'react-router-dom'
import image from './../../assets/imgs/ERROR404.png'
import image2 from './../../assets/imgs/fondoERROR404.jpg'

export const View404Screen = () => {
  return (
    <div style={{
        backgroundImage: `url(${image2})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        boxShadow: 'inset 0 0 0 2000px rgba(0,0,0,0.5)',
    }}>
       
        <div className='d-flex justify-content-center align-items-center'>
            <img src={image} alt="ERROR404" className='img-fluid'
             style={{width: '100%'}}/>
        </div>

        <p className='text-center text-white fs-3'>
            <small>Página no encontrada</small>
        </p>

        <Link to='/' className='btn text-white w-100 pb-4'>
            <i className="fa-solid fa-home"></i> &nbsp;
            Volver al inicio
        </Link>
       
    </div>
  )
}

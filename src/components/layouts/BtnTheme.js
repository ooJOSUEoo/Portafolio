import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm'

const imageD = require('../../assets/imgs/waveD.png')
const imageL = require('../../assets/imgs/waveL.png')
export const BtnTheme = () => {

    const [Active, setActive] = useState(
        localStorage.getItem('TDark') === 'true' ? true : false
        );
    const [formValue, handleCheckboxChange] = useForm({
        theme: Active
    })

    const ruta =  useLocation();

    useEffect(() => {
        formValue.theme = Active
        localStorage.setItem('path', ruta.pathname);

        localStorage.setItem('TDark', formValue.theme)


        if (formValue.theme) {
            document.body.classList.add('dark')
            document.body.classList.remove('light')

            document.querySelector('#header') && document.querySelector('#header').classList.add('bg-dark')
            document.querySelector('#header') && document.querySelector('#header').classList.remove('bg-info')

            document.querySelector('#headerAdmin') && document.querySelector('#headerAdmin').classList.add('bg-dark')
            document.querySelector('#headerAdmin') && document.querySelector('#headerAdmin').classList.remove('bg-info')

            document.querySelectorAll('.text-dark').forEach(item => {
                item.classList.add('text-light')
                item.classList.remove('text-dark')
            })

            document.querySelectorAll('.wave').forEach(item => {
                item.style.backgroundImage = `url(${imageD})`
            })
            
        }else{
            document.body.classList.add('light')
            document.body.classList.remove('dark')

            document.querySelector('#header') && document.querySelector('#header').classList.add('bg-info')
            document.querySelector('#header') && document.querySelector('#header').classList.remove('bg-dark')

            document.querySelector('#headerAdmin') && document.querySelector('#headerAdmin').classList.add('bg-info')
            document.querySelector('#headerAdmin') && document.querySelector('#headerAdmin').classList.remove('bg-dark')

            document.querySelectorAll('.text-light').forEach(item => {
                item.classList.add('text-dark')
                item.classList.remove('text-light')
            })
            document.querySelectorAll('.wave').forEach(item => {
                item.style.backgroundImage = `url(${imageL})`
            })
        }

    }, [Active, formValue, ruta.pathname])

    const handleClickTheme = () => {
        setActive(!Active)
    }

    

  return (
    <div className='position-relative container d-flex justify-content-end mt-2'>
        <input type="checkbox" className="d-none" id="theme-check" 
            checked={Active} onChange={handleCheckboxChange} />
        <button onClick={handleClickTheme} className="btn btn-theme" id="theme-btn">
            {
                Active ?  <i className="fa-regular fa-moon" id="icon-theme"></i> 
                :  <i className="fa-regular fa-sun" id="icon-theme"></i> 
            }
        </button>
    </div>
  )
}

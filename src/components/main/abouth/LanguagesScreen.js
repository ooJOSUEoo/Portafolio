import React from 'react'
import { useSelector } from 'react-redux';

export const LanguagesScreen = () => {

    const {languages} = useSelector(state => state.languages)

    const setActiveClass=({target}) => {
        let list = document.querySelectorAll('.habilidades_button');
        list.forEach(item => {
          item.classList.remove('habilidades__active-progress') 
        })
          target.tagName === 'DIV' && target.children[0].classList.add('habilidades__active-progress')
          target.tagName === 'BUTTON' && target.classList.add('habilidades__active-progress')
          target.tagName === 'P' && target.parentNode.classList.add('habilidades__active-progress')
          target.tagName === 'SPAN' && target.parentNode.classList.add('habilidades__active-progress')
          target.tagName === 'IMG' && target.parentNode.parentNode.classList.add('habilidades__active-progress')

        setTimeout(() => {
            list.forEach(item => {
                item.classList.remove('habilidades__active-progress') 
              })
        }, 3000);
    }

  return (
    <div className="habilidades">
        {
            languages.sort(()=> .5 - Math.random()).map(item => {
                return (
                    <div className="habilidades__items" key={item.id}>
                        <button className="habilidades_button" onMouseMove={setActiveClass}>
                            <span className="habilidades_icon">
                                <img src={item.image} alt="icono" />
                            </span>
                            <p className="habilidades_progress">
                            {
                                parseInt(item.range) === 0 && (
                                <i className="fas fa-frown text-danger"></i>
                                )
                            }
                            {
                                parseInt(item.range) === 1 && (
                                <i className="fas fa-grin-alt text-warning"></i>
                                )
                            }
                            {
                                parseInt(item.range) === 2 && (
                                <i className="fas fa-grin-beam text-warning"></i>
                                )
                            }
                            {
                                parseInt(item.range) === 3 && (
                                <i className="fas fa-laugh-beam text-success"></i>
                                )
                            }
                            </p>
                        </button>
                    </div>
                )
            })
        }
    </div>
  )
}

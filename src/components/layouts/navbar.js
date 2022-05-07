import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {

    const setActiveClass=({target}) => { 
        let list = document.querySelectorAll('.list');
        list.forEach(item => {
          item.classList.remove('active') 
          console.log(item.tagName)
        })
          target.tagName === 'LI' && target.classList.add('active')
          target.tagName === 'A' && target.parentNode.classList.add('active')
          target.tagName === 'SPAN' && target.parentNode.parentNode.classList.add('active')
          target.tagName === 'I' && target.parentNode.parentNode.parentNode.classList.add('active')
    }

  return (
    <nav className="mb-3 zi-100 bg-dark" id="header">{/*<--bg-dark*/}
        <div className="navbar navbar-inverse justify-content-around text-light"> {/*<--text-light*/}
            <div className="navbar-header d-flex">
                <img src="https://avatars.githubusercontent.com/u/51724709?s=40&v=4" className="myPhoto" alt="mi foto" />
                <p className="navbar-brand fw-bold">Josue Muñoz Avila</p>
            </div>
            <div className="navigation">
                <ul className=" ps-0 justify-content-center">
                    <li className="list active" onMouseOver={setActiveClass}>
                        <NavLink to='/'>
                            <span className="icon"><i className="fa fa-home icons_header"></i></span>
                            <span className="text">Inicio</span>
                        </NavLink>
                    </li>
                    <li className="list" onMouseOver={setActiveClass}>
                        <NavLink to='/abouth' id="btn_acerca_de">
                            <span className="icon"><i className="fa fa-user icons_header"></i></span>
                            <span className="text">Acerca de</span>
                        </NavLink>
                    </li>
                    <li className="list" onMouseOver={setActiveClass}>
                        <NavLink to='/projects' id="btn_proyectos">
                            <span className="icon"><i className="fa fa-briefcase icons_header"></i></span>
                            <span className="text">Proyectos</span>
                        </NavLink>
                    </li>
                    <li className="list" onMouseOver={setActiveClass}>
                        <NavLink to='/contact' id="btn_contacto">
                            <span className="icon"><i className="fa fa-comments icons_header"></i></span>
                            <span className="text">Contacto</span>
                        </NavLink>
                    </li>
                    <div className="indicator"></div>
                </ul>
            </div>
        </div>
    </nav>
  )
}

import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {

    const { abouth } = useSelector(state => state.abouth)

    const setActiveClass=({target}) => { 
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
    <nav className="mb-3 zi-100 bg-info" id="header">{/*<--bg-dark*/}
        <div className="navbar navbar-expand-lg navbar-inverse justify-content-around text-light"> {/*<--text-light*/}
            <div className="navbar-header d-flex">
                <img src={abouth&&abouth[0].photo} className="myPhoto" alt="mi foto" />
                <p className="navbar-brand fw-bold mb-0">Josue Muñoz Avila</p>
            </div>
            <div className="navigation">
                <ul className=" ps-0 justify-content-center">
                    <NavLink to='/' className="list" onMouseOver={setActiveClass}>
                        <p>
                            <span className="icon"><i className="fa fa-home icons_header"></i></span>
                            <span className="text">Inicio</span>
                        </p>
                    </NavLink>
                    <NavLink to='/abouth' className="list" onMouseOver={setActiveClass}>
                        <p>
                            <span className="icon"><i className="fa fa-user icons_header"></i></span>
                            <span className="text">Acerca de</span>
                        </p>
                    </NavLink>
                    <NavLink to='/projects' className="list" onMouseOver={setActiveClass}>
                        <p>
                            <span className="icon"><i className="fa fa-briefcase icons_header"></i></span>
                            <span className="text">Proyectos</span>
                        </p>
                    </NavLink>
                    <NavLink to='/contact' className="list" onMouseOver={setActiveClass}>
                        <p>
                            <span className="icon"><i className="fa fa-comments icons_header"></i></span>
                            <span className="text">Contacto</span>
                        </p>
                    </NavLink>
                    <div className="indicator"></div>
                </ul>
            </div>
        </div>
    </nav>
  )
}

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { Logout } from '../../actions/auth'

export const NavBarAdmin = () => {

    const {photoURL} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(Logout())
    }

    const handleShowNav = () => {
        const nav = document.querySelector('#navbarSupportedContent')
        nav.classList.toggle('show')
    }

    const handleShowProfile = (e) => {
        e.preventDefault()
        const profile = document.querySelector('#profile')
        profile.classList.toggle('show')
    }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id='headerAdmin'>
        <div className="container">
            <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleShowNav}
            >
            <i className="fas fa-bars"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <p className="navbar-brand mt-2 mt-lg-0">
                <i className='fas fa-user-cog'></i>
            </p>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <NavLink className="nav-link" to='/admin'>Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to='/admin/abouth'>Abouth</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to='/admin/projects'>Projects</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to='/admin/languages'>Languages</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to='/admin/contact'>Contact</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to='/'>Main</NavLink>
                </li>
            </ul>
            </div>

            <div className="dropdown">
                <a
                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                href="#"
                id="navbarDropdownMenuAvatar"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
                onClick={handleShowProfile}
                >
                <img
                    src={photoURL? photoURL : 'https://mdbootstrap.com/img/Photos/Avatars/avatar-1.jpg'}
                    className="rounded-circle"
                    height="25"
                    alt="Black and White Portrait of a Man"
                    loading="lazy"
                />

                <ul
                id='profile'
                className="dropdown-menu dropdown-menu-end end-0"
                style={{top: '24px'}}
                aria-labelledby="navbarDropdownMenuAvatar"
                >
                <li>
                    <p className="dropdown-item">My profile</p>
                </li>
                <li>
                    <p className="dropdown-item">Settings</p>
                </li>
                <li>
                    <p className="dropdown-item" onClick={handleLogout}>Logout</p>
                </li>
                </ul>

                </a>
            </div>
        </div>
    </nav>
  )
}

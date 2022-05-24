import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer id="footer">
        <div className="waves">
            <div className="wave" id="wave1"></div>
            <div className="wave" id="wave2"></div>
            <div className="wave" id="wave3"></div>
            <div className="wave" id="wave4"></div>
        </div>

        <ul className="menu">
            <li><p>
                Gracias por visitar mi portafolio.
                <br />
                <br />
                Espero que te hayas encontrado lo que buscabas.
                <br />
                </p></li>
        </ul>
        <p id="contacto">Todos los derechos reservados</p>
        <p id="contacto">
          <i className="fa fa-copyright"></i>
          <span>&nbsp;</span>
          <span>2022</span>
        </p>

        <Link to='/admin'>Soy admin</Link>
    </footer>
  )
}

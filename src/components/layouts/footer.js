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
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center">Contacto</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <p className="text-center">Si quieres contactar conmigo, puedes hacerlo a través de los siguientes
                        medios:</p>
                </div>
            </div>
            <form  id="form-contact" className="container">
                {/* <!--- Alerta que se quita despues de 3 segundos --> */}
                <div className="alert alert-success alert-dismissible fade show d-none d-flex justify-content-center align-items-center"
                    role="alert" id="alert-contact">
                    <strong id="b-alert">¡Mensaje enviado!</strong>
                    <p id="p-alert"></p>
                </div>
                <div className="row g-2 mb-3">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="email" className="form-control" id="contc-email" name="email"
                                placeholder="name@example.com" />
                            <label form="contc-email">Correo electronico</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="contc-name" name="name"
                                placeholder="name@example.com" />
                            <label form="contc-name">Nombre completo</label>
                        </div>
                    </div>
                </div>
                <div className="row g-2 mb-3">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="number" min="0" className="form-control" id="contc-tel" name="tel"
                                placeholder="name@example.com" />
                            <label form="contc-tel">Telefono</label>
                        </div>
                    </div>
                    <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a comment here" name="message"
                            id="contc-message" style={{ height: '100px' }}></textarea>
                        <label form="contc-message">Mensaje</label>
                    </div>
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-outline-dark" id="btn-form-contc" type="submit">Enviar</button>
                </div>
            </form>
        </div>
        <ul className="social_icon">
            <li><a href="mailto:sjosue5082002@gmail.com"><i className="fa fa-envelope text-warning"></i></a></li>
            <li><a href="https://wa.me/5212411853099"><i className="fab fa-whatsapp text-green"></i></a></li>
            <li><a href="https://github.com/josuema2002/"><i className="fab fa-github text-dark"></i></a></li>
        </ul>
        {/* <!--<ul className="menu">
            <li><a href="#"></a></li>
        </ul>--> */}
        <p id="contacto">Todos los derechos reservados</p>
        <Link to='/admin'>Soy admin</Link>
    </footer>
  )
}

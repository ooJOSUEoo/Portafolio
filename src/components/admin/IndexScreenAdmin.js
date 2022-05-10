import React from 'react'
import { Link } from 'react-router-dom'

export const IndexScreenAdmin = () => {
  return (
    <div>
      <div className="container mt-3">
        <div className="row">
          <Link className="col-md-6 mb-3" to='/admin/abouth'>
            <div className="card">
              <div className="card-header">
                <h4>Abouth</h4>
              </div>
              <div className="card-body">
                  <p>
                    Sección de información acerca de la página.
                  </p>
              </div>
            </div>
          </Link>
          <Link className="col-md-6 mb-3"to='/admin/projects'>
            <div className="card">
              <div className="card-header">
                <h4>Projects</h4>
              </div>
              <div className="card-body">
                <p>
                  Sección de para mostrar los proyectos realizados.
                  Divididos en todos y principales proyectos.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="row d-flex justify-content-center">
          <Link className="col-md-6 mb-3" to='/admin/contact'>
            <div className="card">
              <div className="card-header">
                <h4>Contact</h4>
              </div>
              <div className="card-body">
                <p>
                  Sección de contacto para poder contactarnos.
                  Manipula el formulario de contacto.
                </p>
              </div>
            </div>
          </Link>
          <Link className="col-md-6 mb-3" to='/admin/languages'>
            <div className="card">
              <div className="card-header">
                <h4>Languages</h4>
              </div>
              <div className="card-body">
                <p>
                  Sección de lenguajes de programación, herramientas, frameworks, etc.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

import React from 'react'

export const IndexScreen = () => {
  return (
    <div className='container text-dark'>
       
      <h1>Descripción del sitio web</h1>

      <p>
        En este sitio web se muestra una descripción de mi trabajo y una lista de mis conocimientos.
      </p>

      <p>
        En el menú de la izquierda se encuentran las siguientes opciones:
      </p>

      <ul>
        <li>
          <strong>Acerca de:</strong>
          <p>
            En esta sección se muestra una breve descripción de mi carrera.
            Quien soy, mis intereses, mis habilidades y mi experiencia.
          </p>
        </li>
        <li>
          <strong>Proyectos</strong>
          <p>
            Aquí se muestran los proyectos que he realizado, estan organizados 
            por categorías, las cuales son: favoritos, todos.
          </p>
        </li>
        <li>
          <strong>Contacto</strong>
          <p>
            Aquí se puede contactar conmigo, si desea saber más sobre mi
            experiencia laboral o si desea realizar una consulta.
          </p>
        </li>
      </ul>

       
    </div>
  )
}

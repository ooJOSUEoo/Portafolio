import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const MainProjectsScreen = () => {

  const { projects } = useSelector(state => state.projects)

  return (
      <div>
        <div className='d-flex justify-content-center mb-2'>
          <Link to='/projects/all' className="btn btn-primary w-100 mx-5">
            <i className="fa-solid fa-ballot"></i> &nbsp;
            Todos los proyectos
          </Link>
        </div>
        <div className="proyect text-dark">
        {
          projects.sort(()=> .5 - Math.random()).map(project => (
            project.favorite &&
              <div className="proyect__container" key={project.id}>
                <div className='row px-1'>
                  <h3 className="proyect__title col-8">{project.name}</h3>
                  <p className="proyect__company col-4">{project.company}</p>
                </div>
                <Link to={`/projects/${project.id}`} className="proyect__container-img">
                  <div className='overflow-hidden'>
                    <img src={project.image} className="proyect__img" alt="Proyecto 1" />
                  </div>
                </Link>
                <p className="proyect__text">{
                    //los primeros 100 caracteres
                    project.description.length > 100 ?
                      project.description.substring(0, 100) + '...'
                      :
                      project.description
                  }</p>
                <p className="proyect__date text-center mb-1 mt-2">{project.init} - {project.end}</p>
                <div className="proyect__view">
                  {
                    project.git && (
                      <a href={project.git}>
                        <i className="fa-brands fa-github proyect__enlace"></i></a>
                    )
                  }
                  {
                    project.demo && (
                      <a href={project.demo}>
                        <i className="fa fa-eye proyect__enlace"></i></a>
                    )
                  }
                </div>
              </div>       
          ))
        }
        </div>
      </div>
  )
}

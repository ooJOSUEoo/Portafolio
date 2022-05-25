import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export const AllProjectsScreen = () => {
  const { projects } = useSelector(state => state.projects)

  const [arrrow, setArrrow] = useState(null)
  const [active, setActive] = useState(false)


  const handleClickShowMore = ({target}) => {
    setArrrow(target.id)

    document.querySelectorAll('.allP__click').forEach(item => {
      item.classList.remove('active')
    })
    setActive(!active)
    
    if(active){
      switch (target.tagName) {
        case 'I':
          target.parentElement.parentElement.parentElement.children[1].classList.add('active')
          break;
        case 'BUTTON':
          target.parentElement.parentElement.children[1].classList.add('active')
          break;
        default:
          break;
      }
    }else{
      setArrrow(null)
      switch (target.tagName) {
        case 'I':
          target.parentElement.parentElement.parentElement.children[1].classList.remove('active')
          break;
        case 'BUTTON':
          target.parentElement.parentElement.children[1].classList.remove('active')
          break;
        default:
          break;
      }
    }
  }
  return (
    <div>
       
      <div className='allP__container text-dark'>

        {
          projects.map(project => (
            <div className="allP__container-proyect" key={project.id}>
              <div className='row px-1'>
                <h3 className="allP__title col-8">{project.name}</h3>
                <p className="allP__company col-4">{project.company}</p>
                <p className="allP__description col-10">
                  {
                    arrrow === project.id ?
                    (
                      project.description 
                    )
                    :(
                      //los primeros 100 caracteres
                      project.description.length > 100 ?
                        project.description.substring(0, 100) + '...'
                        :
                        project.description
                    )
                  }
                </p>
                <button className="allP__btn col-2" id={project.id} onClick={handleClickShowMore}>
                  {
                    arrrow === project.id  ? <i className="fa-solid fa-caret-up fs-2" id={project.id}></i>
                            : <i className="fa-solid fa-caret-down fs-2" id={project.id}></i>
                  }
                </button>
              </div>
              <div className="allP__click " id={project.id}>
                <div className="allP__container-initend">
                  <p className="allP__date text-center mb-1 mt-2">{project.init} - {project.end}</p>
                </div>
                <div className="allP__links">
                  {
                    project.git && (
                      <a href={project.git}>
                        <i className="fa-brands fa-github allP__enlace"></i></a>
                    )
                  }
                  {
                    project.demo && (
                      <a href={project.demo}>
                        <i className="fa fa-eye allP__enlace"></i></a>
                    )
                  }
                </div>
                <div className="allP__container-img">
                  <img src={project.image} className="allP__img" alt="Proyecto 1" />
                </div>
              </div>
            </div>
          ))
        }

      </div>
       
    </div>
  )
}

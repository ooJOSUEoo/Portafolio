import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { GetProjectById } from '../../../selectors/GetProjectByID';

export const SpecificProjectScreen = () => {

    const {projects} = useSelector(state => state.projects);

    const {id} = useParams();
    const navigate = useNavigate();

    const project = useMemo(() => GetProjectById(id, projects), [id, projects]);

    if (!project) {
       navigate('/');
    }


  return (
    <div className='container text-dark'>
       
       <h1>{project.name}</h1>
         <div className=' border-info border-2 border rounded-3'>
             {
                project.description.split('\n').map((item, key) => (
                    <p key={key} className="text-center">{item}</p>
                ))
             }
         </div>
            <p> <i className="fa-solid fa-calendar-alt"></i> &nbsp;
                {project.init} - {project.end}</p>
            <p> <i className="fa-solid fa-building"></i> &nbsp;
                {project.company}</p>
            <a href={project.git} className="me-5">
                <i className="fa-brands fa-github proyect__enlace"></i>
            </a>
            <a href={project.demo} className="ms-5">
                <i className="fa fa-eye proyect__enlace"></i>
            </a>
            <div className='overflow-hidden d-flex justify-content-center'>
                <img src={project.image} className="proyect__img w-auto h-auto" alt={project.name} />
            </div>
       
    </div>
  )
}

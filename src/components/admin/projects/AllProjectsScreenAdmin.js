import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { activeEditProject, deleteProject, projectsSetActive } from '../../../actions/projects';
import { Pagination } from '../../layouts/Pagination';

export const AllProjectsScreenAdmin = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects } = useSelector(state => state.projects);

  const location = useLocation()
  const num = parseInt(location.hash.split('/')[1] ? location.hash.split('/')[1] : 0)
  const num1 = num <= 0 ? 0 : (num*10)
  const num2 = num <= 0 ? 10 : (num*10)+10
  const array = projects.length > 5 ? projects.slice(num1, num2) : projects

  const handleEdit = (data) => {
    dispatch(activeEditProject())
    dispatch(projectsSetActive(data));
    navigate('/admin/projects/new');
  }

  const handleDelete = (id) => {
    dispatch(deleteProject(id));
  }

  return (
    <div>
      <div className='table-responsive'> 
      <h3>All</h3>
         <table className="table text-light">
           <thead className="thead-default">
             <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Link Github</th>
                <th>Link Demo</th>
                <th>Init Date</th>
                <th>End Date</th>
                <th>Company</th>
                <th>
                  <i className="fas fa-star"></i>
                </th>
                <th>Actions</th>
             </tr>
             </thead>
             <tbody>
                {
                  array.map((project, i) => (
                    <tr key={project.id}>
                      <th scope="row">{num*10+i+1}</th>
                      <td>{project.name}</td>
                      <td>{project.description}</td>
                      <td>
                        <img src={project.image} alt="project" className="img-fluid" />
                      </td>
                      <td>
                        <Link to={project.git}> Ir a GitHub </Link>
                      </td>
                      <td>
                        <Link to={project.demo}> Ir a Demo </Link>
                      </td>
                      <td>{project.init}</td>
                      <td>{project.end}</td>
                      <td>{project.company}</td>
                      <td>{project.favorite ? 'Yes' : 'No'}</td>
                      <td>
                        <div className='d-flex justify-content-center'>
                          <button className="btn btn-primary" onClick={()=>handleEdit(project)}><i className="fas fa-edit"></i></button>
                          &nbsp;
                          <button className="btn btn-danger" onClick={()=>handleDelete(project.id)}><i className="fas fa-trash-alt"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))
                }      
             </tbody>
         </table>       
      </div>
      <Pagination data={projects} num={num} />
    </div>
  )
}

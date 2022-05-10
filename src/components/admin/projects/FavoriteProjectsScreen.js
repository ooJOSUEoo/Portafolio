import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const FavoriteProjectsScreen = () => {

  const { projects } = useSelector(state => state.projects);

  return (
    <div className='table-responsive'> 
    <h3>Favorites</h3>
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
              <th>Actions</th>
           </tr>
           </thead>
           <tbody>
              {
                projects.map((project, i) => (
                  project.favorite ? (
                    <tr key={project.id}>
                    <th scope="row">{i+1}</th>
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
                    <td>
                      <div className='d-flex justify-content-center'>
                        <button className="btn btn-danger"><i className="fas fa-trash-alt"></i></button>
                        &nbsp;
                        <button className="btn btn-primary"><i className="fas fa-edit"></i></button>
                      </div>
                    </td>
                  </tr>
                  )
                  : null
                ))
              }
                {/* <th scope='row'>1</th>
                <td>Project 1</td>
                <td>Description 1</td>
                <td>Image 1</td>
                <td>Link Github 1</td>
                <td>Link Demo 1</td>
                <td>Init Date 1</td>
                <td>End Date 1</td>
                <td>Favorite 1</td>
                <td>
                  <button type="button" className="btn btn-primary"><i className="fas fa-edit"></i></button>
                  &nbsp;
                  <button type="button" className="btn btn-danger"><i className="fas fa-trash-alt"></i></button>
                </td> */}

           </tbody>
       </table>       
    </div>
  )
}

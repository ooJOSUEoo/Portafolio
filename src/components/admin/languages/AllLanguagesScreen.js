/* eslint-disable eqeqeq */
import React from 'react'
import { useSelector } from 'react-redux';

export const AllLanguagesScreen = () => {
  const { languages } = useSelector(state => state.languages);
  return (
    <div className='table-responsive'> 
    <h3>All</h3>
       <table className="table text-light">
         <thead className="thead-default">
           <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Range</th>
              <th>Actions</th>
           </tr>
           </thead>
           <tbody>
              {
                languages.map((language, i) => (
                  <tr key={language.id}>
                    <th scope="row">{i+1}</th>
                    <td>{language.name}</td>
                    <td>
                      <img src={language.image} alt="language" className="img-fluid" />
                    </td>
                    <td className='fs-3'>
                      {
                        language.range == 0 && (
                          <i className="fas fa-frown text-danger"></i>
                        )
                      }
                      {
                        language.range == 1 && (
                          <i className="fas fa-grin-alt text-warning"></i>
                        )
                      }
                      {
                        language.range == 2 && (
                          <i className="fas fa-grin-beam text-warning"></i>
                        )
                      }
                      {
                        language.range == 3 && (
                          <i class="fas fa-laugh-beam text-success"></i>
                        )
                      }
                      </td>
                    <td>
                      <div className='d-flex justify-content-center'>
                        <button className="btn btn-danger"><i className="fas fa-trash-alt"></i></button>
                        &nbsp;
                        <button className="btn btn-primary"><i className="fas fa-edit"></i></button>
                      </div>
                    </td>
                  </tr>
                ))
              }

           </tbody>
       </table>       
    </div>
  )
}

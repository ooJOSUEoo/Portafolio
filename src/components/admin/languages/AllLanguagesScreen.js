/* eslint-disable eqeqeq */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { activeEditLanguage, deleteLanguage, languagesSetActive } from '../../../actions/languages';

export const AllLanguagesScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { languages } = useSelector(state => state.languages);

  const handleEdit = (data) => {
    dispatch(activeEditLanguage())
    dispatch(languagesSetActive(data));
    navigate('/admin/languages/new');
  }

  const handleDelete = (id) => {
    dispatch(deleteLanguage(id));
  }

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
                          <i className="fas fa-laugh-beam text-success"></i>
                        )
                      }
                      </td>
                    <td>
                      <div className='d-flex justify-content-center'>
                        &nbsp;
                        <button className="btn btn-primary" onClick={()=>handleEdit(language)}><i className="fas fa-edit"></i></button>
                        <button className="btn btn-danger" onClick={()=>handleDelete(language.id)}><i className="fas fa-trash-alt"></i></button>
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
